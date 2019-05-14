let database = require("../../config/db");
let sequelize = database.sequelize;
let connection = database.connection;

let insertSubject = (curriculum_subject, subject) => {
  return curriculum_subject.create({
    curriculum_id: subject.curriculumId,
    subject_id: subject.subjectId,
    credit: subject.credit
  });
};

let insertElectiveSubject = (elective_subject, subject) => {
  return elective_subject.create({
    elective_id: subject.electiveId,
    subject_id: subject.subjectId
  });
};

let createCurriculum = (curriculum, curriculumDetail) => {
  return curriculum.create({
    name: curriculumDetail.name,
    department_id: curriculumDetail.departmentId,
    academic_year_id: curriculumDetail.academicYearId,
    semester_id: curriculumDetail.semesterId
  });
};

let init = function() {
  return (curriculum = connection.define(
    "curriculum",
    {
      id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      uuid: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4
      },
      name: {
        type: sequelize.STRING,
        allowNull: false
      },
      status: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      department_id: {
        type: sequelize.INTEGER
      },
      academic_year_id: {
        type: sequelize.INTEGER
      },
      semester_id: {
        type: sequelize.INTEGER
      },
      frozen: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      classMethods: {
        associate: function(model) {
          let curriculum = model.curriculum;
          let department = model.department;
          let academicYear = model.academic_year;
          let semester = model.semester;
          department.hasMany(curriculum, {
            foreignKey: "department_id"
          });
          curriculum.belongsTo(department, {
            foreignKey: "department_id"
          });
          curriculum.belongsTo(academicYear, {
            foreignKey: "academic_year_id"
          });
          curriculum.belongsTo(semester, {
            foreignKey: "semester_id"
          });
        },
        getAllCurriculum: (models, courseObj) => {
          let curriculum = models.curriculum;
          let department = models.department;
          let course = models.course;
          let semester = models.semester;
          let academicYear = models.academic_year;
          let subject = models.subject;
          let elective = models.elective;
          let courseId = courseObj.courseId;
          let academicYearId = courseObj.academicYearId;
          let resultArray = [];
          let nameAllList = []; // To get distinct rows

          let curriculumListEach = curriculum.findAll({
            attributes: [
              "id",
              "name",
              "frozen",
              "status",
              [sequelize.col("semester.id"), "semester_id"],
              [sequelize.col("semester.name"), "semester_name"],
              [sequelize.col("academic_year.id"), "academic_year_id"],
              [sequelize.col("academic_year.name"), "academic_year_name"],
              [sequelize.col("department.id"), "department_id"],
              [sequelize.col("department.name"), "department_name"]
            ],
            where: { name: { $notILike: "ALL%" }, status: true },
            include: [
              {
                model: semester,
                attributes: [],
                where: { status: true }
              },
              {
                model: academicYear,
                attributes: [],
                where: { id: academicYearId, status: true }
              },
              {
                model: department,
                attributes: [],
                where: { course_id: courseId, status: true }
              }
            ]
          });

          let curriculumListCommon = curriculum.findAll({
            attributes: [
              "id",
              "name",
              "frozen",
              [sequelize.col("semester.id"), "semester_id"],
              [sequelize.col("semester.name"), "semester_name"],
              [sequelize.col("academic_year.id"), "academic_year_id"],
              [sequelize.col("academic_year.name"), "academic_year_name"]
            ],
            where: { status: true },
            include: [
              {
                model: semester,
                attributes: [],
                where: { status: true }
              },
              {
                model: academicYear,
                attributes: [],
                where: { id: academicYearId, status: true }
              },
              {
                model: department,
                attributes: [],
                where: { course_id: courseId, status: true }
              }
            ]
          });

          return Promise.all([curriculumListEach, curriculumListCommon])
            .then(values => {
              let resultEachDep = values[0];
              let resultCommonDep = values[1];
              for (let i in resultEachDep)
                resultArray.push(resultEachDep[i].dataValues);
              // for(let j in resultCommonDep){
              //     var resultValue= resultCommonDep[j].dataValues ;
              //     if(nameAllList.indexOf(resultValue.name)==-1){
              //         nameAllList.push(resultValue.name);
              //         resultArray.push(resultValue);
              //     }
              // }
              if (resultArray.length > 0)
                return { error: null, result: resultArray };
              else return { error: "NO_ROWS_FOUND" };
            })
            .catch(error => {
              console.log("Error, Inside getAllCuriculum catch: ", error);
              return { error };
            });
        },
        // Gets list of semester id, semester name for which curriculum doesnot exists
        getSemesterList: (models, parameters) => {
          let curriculum = models.curriculum;
          let department = models.department;
          let course = models.course;
          let semester = models.semester;
          let academicYear = models.academic_year;
          let courseId = parameters.courseId;
          let academicYearId = parameters.academicYearId;
          let existingSemesterId = [];
          let result = [];

          let existingSemesterList = curriculum.findAll({
            attributes: ["semester_id"],
            where: { status: true },
            include: [
              {
                model: academicYear,
                attributes: [],
                where: { id: academicYearId, status: true }
              },
              {
                model: department,
                attributes: [],
                where: { course_id: courseId, status: true }
              }
            ]
          });

          return existingSemesterList
            .then(resultExistingSemester => {
              for (let i in resultExistingSemester) {
                var semesterDetail =
                  resultExistingSemester[i].dataValues.semester_id;
                if (existingSemesterId.indexOf(semesterDetail) < 0)
                  existingSemesterId.push(
                    resultExistingSemester[i].dataValues.semester_id
                  );
              }
              let whereObj = {};
              whereObj.course_id = courseId;
              whereObj.status = true;
              if (existingSemesterId.length > 0)
                whereObj.id = { $in: existingSemesterId };
              return semester.findAll({
                attributes: ["id", "name"],
                where: whereObj
              });
            })
            .then(resultSemester => {
              for (let i in resultSemester)
                result.push(resultSemester[i].dataValues);
              if (result.length > 0) return { error: null, result: result };
              else return { error: "NO_ROWS_FOUND" };
            })
            .catch(error => {
              return { error };
            });
        },

        //Get department list in corresponse with the first Semester
        getDepartmentList: (models, parameters) => {
          let department = models.department;
          let departmentList = [];
          return department
            .findAll({
              attributes: [
                [sequelize.col("department.id"), "department_id"],
                [
                  sequelize.col("department.abbreviated_name"),
                  "department_abbreviated_name"
                ],
                [sequelize.col("department.name"), "department_name"]
              ],
              where: {
                status: true
              }
            })
            .then(resultDepartment => {
              for (let i in resultDepartment) {
                departmentList.push(resultDepartment[i].dataValues);
              }
              return { error: null, result: departmentList };
            })
            .catch(error => {
              return { error };
            });
        },

        createCurriculumForGivenDepartments: (models, parameters) => {
          let curriculum = models.curriculum;
          let department = models.department;
          let academicYear = models.academic_year;
          let courseId = parameters.courseId;
          let semesterId = parameters.semesterId;
          let academicYearId = parameters.academicYearId;
          let curriculumName = parameters.curriculumName.toUpperCase();
          let departmentId = parameters.departmentId;
          let result = [];
          let createCurriculumPromise = [];
          let resultAcademicYear = "";
          let whereObj = {
            academic_year_id: academicYearId,
            semester_id: semesterId,
            name: curriculumName,
            status: true
          };

          checkIfCurriculumExists = curriculum.findOne({
            where: whereObj,
            include: [
              {
                model: department,
                attributes: [],
                where: { course_id: courseId, status: true }
              }
            ]
          });

          getAcademicYear = academicYear.findOne({
            attributes: ["id", "start_date", "name"],
            where: { id: academicYearId }
          });

          getDepartmentName = department.findOne({
            where: {
              id: departmentId
            }
          });

          return Promise.all([
            checkIfCurriculumExists,
            getAcademicYear,
            getDepartmentName
          ])
            .then(values => {
              if (values[0]) throw "IS_ALREADY_EXISTS";
              if (values[2] == null) throw "DEPARTMENT DOES NOT EXIST";
              else {
                let resultYear = values[1].dataValues;
                resultAcademicYear = resultYear.start_date.getFullYear();

                let name = "";
                name =
                  values[2].dataValues.abbreviated_name +
                  "-" +
                  curriculumName +
                  "-" +
                  semesterId +
                  "-" +
                  resultAcademicYear;
                var curriculumObj = {
                  name,
                  academicYearId,
                  semesterId,
                  departmentId: parameters.departmentId
                };
                createCurriculumPromise.push(
                  createCurriculum(curriculum, curriculumObj)
                );
              }

              return Promise.all(createCurriculumPromise);
            })
            .then(values => {
              for (let i in values) {
                result.push(values[i].dataValues);
              }
              result[0].academic_year_name = values[1].dataValues.name;
              result[0].department_name = values[2].dataValues.name;
              return { error: null, result };
            })
            .catch(error => {
              console.log(error);
              return { error };
            });
        },

        deleteCurriculum: (models, parameters) => {
          let curriculum = models.curriculum;
          let curriculumSubject = models.curriculum_subject;
          let elective = models.elective;
          let courseId = parameters.courseId;
          let curriculumName = parameters.curriculumName;
          let curriculumId = [];
          let list = {};

          let curriculumList = curriculum.findAll({
            attributes: [["id", "curriculum_id"]],
            where: { status: true, name: curriculumName },
            include: [
              {
                model: department,
                attributes: [],
                where: { course_id: courseId, status: true }
              }
            ]
          });

          return curriculumList
            .then(result => {
              let id = "";
              if (result.length > 0) {
                for (let i in result) {
                  var idObj = result[i].dataValues.curriculum_id;
                  curriculumId.push(idObj);
                }
                return elective.update(
                  { status: false },
                  { where: { curriculum_id: curriculumId } }
                );
              } else {
                return { error: "NO_ROWS_FOUND" };
              }
            })
            .then(resultElective => {
              list.No_OF_ROWS_DELETED_ELECTIVE = resultElective[0];
              return curriculumSubject.update(
                { status: false },
                { where: { curriculum_id: curriculumId } }
              );
            })
            .then(resultSubject => {
              list.No_OF_ROWS_DELETED_SUBJECT = resultSubject[0];
              return curriculum.update(
                { status: false },
                { where: { id: curriculumId } }
              );
            })
            .then(resultCurriculum => {
              list.No_OF_ROWS_DELETED_CURRICULUM = resultCurriculum[0];
              list.id = resultCurriculum[0];
              list.status = 1;
              return { error: null, result: list };
            })
            .catch(error => {
              console.log("Error, Inside deleteCurriculum catch: ", error);
              return { error };
            });
        },

        editCurriculum: (models, parameters) => {
          let list = {};
          let name = parameters.name;
          let id = parameters.id;
          return curriculum
            .update({ name: name }, { where: { id: id } })
            .then(updatedCurriculum => {
              list.UPDATED_ID = updatedCurriculum[0];
              list.UPDATED_CURRICULUM_NAME = name;
              list.status = 1;
              return { error: null, result: list };
            })
            .catch(error => {
              console.log("Error occured inside the edit curriculum : ", error);
              return { error };
            });
        },

        allocateSubjectElective: (models, parameters) => {
          let curriculum = models.curriculum;
          let curriculumSubject = models.curriculum_subject;
          let electiveSubject = models.elective_subject;
          let elective = models.elective;
          let subject = models.subject;
          let courseId = parameters.courseId;
          let curriculumName = parameters.curriculumName;
          let subjectList = parameters.subjects;
          let electiveSubjectList = parameters.electiveSubjects;
          let curriculumIds = [];
          let electiveId = []; // Stores complete list of electives
          let list = {};
          let insertSubjects = [];
          let count = 0;
          let insertElectiveSubjects = [];
          let electiveDetail = []; // To store list of elective ids, name wise
          let electiveFlag = false;

          let curriculumList = curriculum.findAll({
            attributes: [["id", "curriculum_id"]],
            where: { status: true, name: curriculumName },
            include: [
              {
                model: department,
                attributes: [],
                where: { course_id: courseId, status: true }
              }
            ]
          });

          return curriculumList
            .then(result => {
              let id = "";
              let electiveId = "";
              if (result.length > 0) {
                for (let i in result) {
                  id = result[i].dataValues.curriculum_id;
                  curriculumIds.push(id);
                }
                return elective.findAll({
                  attributes: [
                    ["id", "elective_id"],
                    ["name", "elective_name"]
                  ],
                  where: { curriculum_id: { $or: curriculumIds }, status: true }
                });
              } else {
                return { error: "NO_ROWS_FOUND" };
              }
            })
            .then(resultElectiveList => {
              for (let i in resultElectiveList) {
                electiveFlag = false;
                let electiveObj = resultElectiveList[i].dataValues;
                electiveId.push(electiveObj.elective_id);
                for (let j in electiveDetail) {
                  if (electiveDetail[j].name == electiveObj.elective_name) {
                    electiveDetail[j].ids.push(electiveObj.elective_id);
                    electiveFlag = true;
                  }
                }
                if (electiveFlag == false) {
                  var obj = {};
                  obj.name = electiveObj.elective_name;
                  obj.ids = [];
                  obj.ids.push(electiveObj.elective_id);
                  electiveDetail.push(obj);
                }
              }
              return electiveSubject.destroy({
                where: { elective_id: { $or: electiveId } },
                status: true
              });
            })
            .then(resultElectiveDelete => {
              list.No_OF_ROWS_DELETED_ELECTIVE = resultElectiveDelete;
              return curriculumSubject.destroy({
                where: { curriculum_id: { $or: curriculumIds } },
                status: true
              });
            })
            .then(resultCurriculumSubjectDelete => {
              list.No_OF_ROWS_DELETED_SUBJECT = resultCurriculumSubjectDelete;
              for (let k in subjectList) {
                for (let m in curriculumIds) {
                  var subjectObj = {};
                  subjectObj.subjectId = subjectList[k].subjectId;
                  subjectObj.credit = subjectList[k].credit;
                  subjectObj.curriculumId = curriculumIds[m];
                  insertSubjects.push(
                    insertSubject(curriculumSubject, subjectObj)
                  );
                }
              }
              return Promise.all(insertSubjects);
            })
            .then(resultInsertSubject => {
              list.SubjectsInserted = [];
              for (let i in resultInsertSubject)
                list.SubjectsInserted.push(resultInsertSubject[i].dataValues);
              for (let i in electiveSubjectList) {
                for (let j in electiveDetail) {
                  if (
                    electiveDetail[j].name ==
                    electiveSubjectList[i].electiveName
                  ) {
                    for (let k in electiveDetail[j].ids) {
                      var electiveSubjectObj = {};
                      electiveSubjectObj.electiveName =
                        electiveSubjectList[i].electiveName;
                      electiveSubjectObj.subjectId =
                        electiveSubjectList[i].subjectId;
                      electiveSubjectObj.electiveId = electiveDetail[j].ids[k];
                      insertElectiveSubjects.push(
                        insertElectiveSubject(
                          electiveSubject,
                          electiveSubjectObj
                        )
                      );
                    }
                  }
                }
              }
              return Promise.all(insertElectiveSubjects);
            })
            .then(resultInsertElectiveList => {
              list.electiveSubjectInserted = [];
              for (let i in resultInsertElectiveList)
                list.electiveSubjectInserted.push(
                  resultInsertElectiveList[i].dataValues
                );
              return { error: null, result: list };
            })
            .catch(error => {
              return { error };
            });
        },

        freezeCurriculum: (models, curriculumObj) => {
          let curriculum = models.curriculum;
          let curriculumId = curriculumObj.curriculumId;

          return curriculum
            .update({ frozen: true }, { where: { id: curriculumId } })
            .then(result => {
              console.log("Result :", result);
              if (result) return { error: null, result: result[0] };
              else return { error: "NO_ROW_UPDATED" };
            })
            .catch(error => {
              return { error };
            });
        }
      }
    }
  ));
};
module.exports = init;
