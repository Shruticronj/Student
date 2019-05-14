/**
 * Created by mustang on 16/03/17.
 */
let database = require("../../config/db");
let sequelize = database.sequelize;
let connection = database.connection;
let init = function() {
  return (subject = connection.define(
    "subject",
    {
      id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
      },
      status: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      classMethods: {
        associate: function(models) {
          var subject = models.subject;
          var skill = models.skill;
          let department = models.department;
          subject.belongsTo(skill, { foreignKey: "skills_set" });
          subject.belongsTo(department, { foreignKey: "department_id" });
        },
        getSubject: (models, parameters) => {
          let subject = models.subject;
          let skill = models.skill;
          let department = models.department;
          return subject
            .findAll({
              attributes: [
                "id",
                "name",
                "status",
                [sequelize.col("skill.name"), "skill_set"],
                [sequelize.col("department.id"), "department_id"],
                [sequelize.col("department.name"), "department_name"]
              ],
              include: [
                {
                  model: skill,
                  attributes: []
                },
                {
                  model: department,
                  attributes: []
                }
              ]
            })
            .then(values => {
              let subjects = values;
              let resultArray = [];
              for (let i in subjects) {
                resultArray.push(subjects[i].dataValues);
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
        addSubject: (models, parameters) => {
          let resultArray = [];
          let result = {};
          let subject = models.subject;
          let department = models.department;
          let skill = models.skill;
          department
            .findOne({
              attributes: ["name"],
              where: { id: parameters.department_id }
            })
            .then(values => {
              result.department_name = values.name;
            });
          skill
            .findOne({
              attributes: ["name"],
              where: { id: parameters.skill_id }
            })
            .then(values => {
              result.skill_set = values.name;
            });
          return subject
            .create({
              name: parameters.subject_name,
              status: parameters.status,
              department_id: parameters.department_id,
              skills_set: parameters.skill_id
            })
            .then(newsub => {
              result.name = newsub.name;
              result.status = newsub.status;
              resultArray.push(result);
              return { error: null, result: resultArray };
            })
            .catch(error => {
              console.log(error);
              return { error };
            });
        },
        editSubject: (models, parameters) => {
          let result = [];
          let subject = models.subject;
          return subject
            .update({ name: parameters.name }, { where: { id: parameters.id } })
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
        deleteSubject: (models, parameters) => {
          let subject = models.subject;
          let result = [];
          return subject
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
                name: parameters.subjectName
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
