let data = require("./../../config/db");
let sequelize = data.sequelize;
let connection = data.connection;

let init = function() {
  return (student = connection.define(
    "student",
    {
      id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      admission_no: {
        type: sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      status: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      user_detail_id: {
        type: sequelize.INTEGER
      },
      department_id: {
        type: sequelize.INTEGER
      },
      parent_id: {
        type: sequelize.INTEGER
      },
      batch_id: {
        type: sequelize.INTEGER
      }
    },
    {
      classMethods: {
        associate: function(models) {
          let student = models.student;
          let user = models.user_detail;
          let department = models.department;
          let parent = models.parent;
          let batch = models.batch;
          let section = models.section;
          student.belongsTo(user, {
            foreignKey: "user_detail_id"
          });
          student.belongsTo(department, {
            foreignKey: "department_id"
          });
          student.belongsTo(parent, {
            foreignKey: "parent_id"
          });
          batch.hasMany(student, {
            foreignKey: "batch_id"
          });
          student.belongsToMany(section, {
            through: "student_section_allocation"
          });
        },
        getStudent: (models, parameters) => {
          let student = models.student;
          let user = models.user_detail;
          let parent = models.parent;
          let department = models.department;
          let studentList = student.findAll({
            attributes: [
              "id",
              "admission_no",
              "status",
              [sequelize.col("user_detail.name"), "student_name"],
              [sequelize.col("department.id"), "department_id"],
              [sequelize.col("department.name"), "department_name"],
              [sequelize.col("parent.father_name"), "father_name"]
            ],
            include: [
              {
                model: user,
                attributes: [],
                where: { status: true }
              },
              {
                model: parent,
                attributes: []
              },
              {
                model: department,
                attributes: []
              }
            ]
          });
          return Promise.all([studentList])
            .then(values => {
              let students = values[0];
              let resultArray = [];
              for (let i in students) {
                resultArray.push(students[i].dataValues);
              }
              if (resultArray.length > 0) {
                return { error: null, result: resultArray };
              } else {
                return { error: "NO_ROWS_FOUND" };
              }
            })
            .catch(error => {
              console.log(error);
              return { error: error };
            });
        },
        addStudent: (models, parameters) => {
          let result = [];
          let user = models.user_detail;
          let student = models.student;
          let parent = models.parent;
          let department = models.department;
          let user_id = null;
          let detail = {};
          Promise.all([
            parent.findOne({
              attributes: ["father_name"],
              where: { id: parameters.parent_id }
            }),
            department.findOne({
              attributes: ["name"],
              where: { id: parameters.department_id }
            })
          ]).then(values => {
            detail.father_name = values[0].father_name;
            detail.department_name = values[1].name;
          });
          return user
            .create({
              username: parameters.username,
              password: "test",
              name: parameters.studentName,
              date_of_birth: "2016-12-04T07:45:00Z",
              gender: parameters.gender,
              status: true,
              permanent_address: JSON.stringify({
                address: "482 Ignatius Lake",
                street: "Wolf Dam",
                pincode: 688860,
                city: "Cummingsstad",
                state: "Lake Paris",
                country: "India"
              }),
              current_address: JSON.stringify({
                address: "684 Alvera Lake",
                street: "Jeramie Harbor",
                pincode: 635793,
                city: "Port Sadie",
                state: "New Kaia",
                country: "India"
              }),
              email_id: parameters.email_id,
              contact_number: parameters.contact_no,
              country_code_one: "91",
              status: true
            })
            .then(user => {
              if (user.id) {
                return student
                  .create({
                    admission_no: parameters.admission_no,
                    status: true,
                    user_detail_id: user.id,
                    department_id: parameters.department_id,
                    parent_id: parameters.parent_id,
                    batch_id: parameters.batch_id
                  })
                  .then(student => {
                    detail.student_name = user.dataValues.name;
                    detail.status = student.dataValues.status;
                    result = [
                      {
                        status: 1,
                        student: detail
                      }
                    ];
                    return { error: null, result };
                  })
                  .catch(error => {
                    console.log(error);
                    return { error };
                  });
              } else {
                return { error: "OPERATION FAILED !" };
              }
            })
            .catch(error => {
              console.log(error);
              return { error };
            });
        },
        editStudent: (models, parameters) => {
          let findStudent = {};
          let result = [];
          let user = models.user_detail;
          let student = models.student;

          return student
            .findOne({
              attributes: ["user_detail_id", "parent_id", "department_id"],
              where: {
                id: parameters.id
              }
            })
            .then(stuDetail => {
              return user.update(
                { name: parameters.student_name },
                { where: { id: stuDetail.user_detail_id } }
              );
            })
            .then(resp => {
              if (resp && resp[0]) {
                data = {
                  name: parameters.student_name,
                  id: parameters.id
                };
                result.push(data);
                return { error: null, result };
              }
            })
            .catch(error => {
              console.log(error);
              return { error };
            });
        },
        deleteStudent: (models, parameters) => {
          let student = models.student;
          let result = [];
          return student
            .update(
              { status: false },
              {
                where: {
                  id: parameters.id
                }
              }
            )
            .then(response => {
              let data = {
                id: response[0],
                name: parameters.student_name
              };
              result.push(data);
              return { error: null, result: result };
            })
            .catch(error => {
              return { error: error };
            });
        }
      }
    }
  ));
};

module.exports = init;
