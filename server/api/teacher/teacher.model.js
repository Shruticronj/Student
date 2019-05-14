let database = require("../../config/db");
let sequelize = database.sequelize;
let connection = database.connection;

let init = function() {
  return (teacher = connection.define(
    "teacher",
    {
      id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      joining_date: {
        type: sequelize.DATE,
        allowNull: false
      },
      designation: {
        type: sequelize.STRING,
        allowNull: false
      },
      experience_years: {
        type: sequelize.INTEGER,
        allowNull: false
      },
      experience_description: {
        type: sequelize.TEXT
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
      }
    },
    {
      classMethods: {
        associate: function(models) {
          let teacher = models.teacher;
          let skill = models.skill;
          let user = models.user_detail;
          let department = models.department;
          skill.hasMany(teacher, { foreignKey: "skill_set" });
          teacher.belongsTo(user, {
            foreignKey: "user_detail_id"
          });
          teacher.belongsTo(department, {
            foreignKey: "department_id"
          });
        },
        getTeacher: (models, parameters) => {
          let teacher = models.teacher;
          let user = models.user_detail;
          let department = models.department;
          let teacherList = teacher.findAll({
            attributes: [
              "id",
              "status",
              "designation",
              [sequelize.col("user_detail.name"), "teacher_name"],
              [sequelize.col("department.id"), "department_id"],
              [sequelize.col("department.name"), "department_name"]
            ],
            include: [
              {
                model: user,
                attributes: []
              },
              {
                model: department,
                attributes: []
              }
            ]
          });
          return Promise.all([teacherList])
            .then(values => {
              let teachers = values[0];
              let resultArray = [];
              for (let i in teachers) {
                resultArray.push(teachers[i].dataValues);
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
        editTeacher: (models, parameters) => {
          let result = [];
          let user = models.user_detail;
          let teacher = models.teacher;

          return teacher
            .findOne({
              attributes: ["user_detail_id", "department_id"],
              where: {
                id: parameters.id
              }
            })
            .then(teacherDetail => {
              return user.update(
                { name: parameters.name },
                { where: { id: teacherDetail.user_detail_id } }
              );
            })
            .then(resp => {
              if (resp && resp[0]) {
                data = {
                  name: parameters.name,
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
        deleteTeacher: (models, parameters) => {
          let teacher = models.teacher;
          let result = [];
          return teacher
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
                name: parameters.teacher_name
              };
              result.push(data);
              return { error: null, result: result };
            })
            .catch(error => {
              return { error: error };
            });
        },
        addTeacher: (models, parameters) => {
          let result = [];
          let user = models.user_detail;
          let teacher = models.teacher;
          let parent = models.parent;
          let department = models.department;
          let user_id = null;
          let detail = {};
          Promise.all([
            department.findOne({
              attributes: ["name"],
              where: { id: parameters.department_id }
            })
          ]).then(values => {
            detail.department_name = values[0].name;
          });
          return user
            .create({
              username: parameters.username,
              password: "test",
              name: parameters.teacher_name,
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
                return teacher
                  .create({
                    joining_date: "2016-12-04T07:45:00Z",
                    designation: parameters.designation,
                    experience_years: 6,
                    experience_description: "Good",
                    status: true,
                    user_detail_id: user.id,
                    department_id: parameters.department_id
                  })
                  .then(teacher => {
                    detail.id = teacher.id;
                    detail.status = teacher.dataValues.status;
                    detail.teacher_name = user.dataValues.name;
                    detail.designation = teacher.dataValues.designation;
                    result = [
                      {
                        teacher: detail
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
        }
      }
    }
  ));
};
module.exports = init;
