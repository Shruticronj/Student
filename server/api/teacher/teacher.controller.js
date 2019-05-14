let teacher = require("./teacher.model")();
let models = require("./../../sqldb")();

module.exports = {
  addTeacher: (req, res) => {
    if (req.body) {
      if (!req.body.teacher_name)
        res.status(400).json({
          error: "Missing Name Parameters",
          message: "IS_INVALID_INPUT_FORM"
        });
      else {
        teacher.addTeacher(models, req.body).then(output => {
          let result = output.result;
          let error = output.error;
          if (result) {
            if (result.length > 0) {
              res
                .status(200)
                .json({
                  data: result,
                  message: "SUCCESS_OPERATION",
                  status: 1
                });
            } else
              res.status(500).json({ data: [], message: "NO_ROW_INSERTED" });
          } else {
            if (error == "IS_ALREADY_EXISTS")
              res.status(400).json({ data: [], message: "IS_ALREADY_EXISTS" });
            else {
              res
                .status(500)
                .json({ error: error, message: "IS_INTERNAL_SERVER_ERROR" });
            }
          }
        });
      }
    } else {
      res.status(400).json({
        error: "Missing Parameters",
        message: "IS_INVALID_INPUT_FORM"
      });
    }
  },

  getTeacher: (req, res) => {
    if (req.body) {
      teacher.getTeacher(models, req.body).then(output => {
        let result = output.result;
        let error = output.error;
        if (result)
          res.status(200).json({ data: result, message: "ROWS_FOUND" });
        else {
          if (error == "NO_ROWS_FOUND")
            res.status(200).json({ data: [], message: "NO_ROWS_FOUND" });
          else
            res
              .status(500)
              .json({ error: error, message: "IS_INTERNAL_SERVER_ERROR" });
        }
      });
    } else {
      res.status(400).json({
        error: "Missing Paramters: courseId and academicYearId",
        message: "IS_INVALID_INPUT_FORM"
      });
    }
  },

  deleteTeacher: (req, res) => {
    if (req.body) {
      teacher.deleteTeacher(models, req.body).then(output => {
        let result = output.result;
        let error = output.error;
        if (result) {
          res
            .status(200)
            .json({ data: result, message: "SUCCESS_OPERATION", status: 1 });
        } else {
          if (error == "NO_ROWS_FOUND")
            res.status(200).json({ data: [], message: "NO_ROWS_FOUND" });
          else
            res
              .status(500)
              .json({ error: error, message: "IS_INTERNAL_SERVER_ERROR" });
        }
      });
    } else {
      res
        .status(400)
        .json({ error: "Missing Paramters", message: "IS_INVALID_INPUT_FORM" });
    }
  },

  editTeacher: (req, res) => {
    if (req.body) {
      teacher.editTeacher(models, req.body).then(output => {
        let result = output.result;
        let error = output.error;
        if (result) {
          res
            .status(200)
            .json({ data: result, message: "SUCCESS_OPERATION", status: 1 });
        } else {
          if (error == "NO_ROWS_FOUND")
            res.status(200).json({ data: [], message: "NO_ROWS_FOUND" });
          else
            res
              .status(500)
              .json({ error: error, message: "IS_INTERNAL_SERVER_ERROR" });
        }
      });
    } else {
      res.status(400).json({
        error: "Missing Parameters",
        message: "IS_INVALID_INPUT_FORM"
      });
    }
  }
};
