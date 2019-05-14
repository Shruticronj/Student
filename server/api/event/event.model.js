let data = require("./../../config/db");
let connection = data.connection;
let sequelize = data.sequelize;
let sql = function() {
  let event = connection.define(
    "event",
    {
      id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: sequelize.STRING,
        allowNull: false
      },
      description: {
        type: sequelize.TEXT,
        allowNull: false
      },
      start_time: {
        type: sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: sequelize.DATE,
        allowNull: false
      },
      venue: {
        type: sequelize.STRING
      },
      status: {
        type: sequelize.BOOLEAN,
        defaultValue: true
      }
    },
    {
      classMethods: {
        associate: function(models) {
          let userDetail = models.user_detail;
          let event = models.event;
          userDetail.hasMany(event, {
            foreignKey: "creator_id"
          });
          let department = models.department;
          event.belongsToMany(department, {
            through: "event_department"
          });
          let role = models.role;
          event.belongsToMany(role, {
            through: "event_role"
          });
          let club = models.club;
          event.belongsToMany(club, {
            through: "club_event"
          });
        },
        eventList: (models, parameters) => {
          let event = models.event;
          return event
            .findAll({
              attributes: [
                "id",
                ["name", "eventName"],
                ["description", "eventDescription"],
                "status",
                "venue",
                "start_time",
                "end_date"
              ]
            })
            .then(values => {
              let events = values;
              let resultArray = [];
              for (let i in events) {
                resultArray.push(events[i].dataValues);
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
        addEvent: (models, parameters) => {
          let resultArray = [];
          let result = {};
          let event = models.event;
          return event
            .create({
              name: parameters.eventName,
              description: parameters.eventDescription,
              start_time: parameters.startDate,
              end_date: parameters.endDate,
              venue: parameters.venue
            })
            .then(newEvent => {
              result.eventName = newEvent.name;
              result.eventDescription = newEvent.description;
              result.status = newEvent.status;
              result.startDate = newEvent.start_time;
              result.endDate = newEvent.end_date;
              result.venue = newEvent.venue;
              resultArray.push(result);
              return { error: null, result: resultArray };
            })
            .catch(error => {
              console.log(error);
              return { error };
            });
        },
        editEvent: (models, parameters) => {
          let result = [];
          let event = models.event;
          return event
            .update(
              { name: parameters.eventName },
              { where: { id: parameters.id } }
            )
            .then(resp => {
              if (resp && resp[0]) {
                data = {
                  name: parameters.eventName,
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
        deleteEvent: (models, parameters) => {
          let event = models.event;
          let result = [];
          return event
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
                name: parameters.eventName
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
  );
  return event;
};
module.exports = sql;
