let event = require("./event.model")();
let models = require("./../../sqldb")();

module.exports = {
  addEvent: (req, res) => {
    if (req.body) {
      if (!req.body.eventName)
        res.status(400).json({
          error: "Missing Name Parameters",
          message: "IS_INVALID_INPUT_FORM"
        });
      else {
        event.addEvent(models, req.body).then(output => {
          let result = output.result;
          let error = output.error;
          if (result) {
            if (result.length > 0) {
              res.status(200).json({
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

  eventList: (req, res) => {
    if (req.body) {
      event.eventList(models, req.body).then(output => {
        let result = output.result;
        let error = output.error;
        if (result)
          res
            .status(200)
            .json({ data: result, message: "ROWS_FOUND", status: 1 });
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

  deleteEvent: (req, res) => {
    if (req.body) {
      event.deleteEvent(models, req.body).then(output => {
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

  editEvent: (req, res) => {
    if (req.body) {
      event.editEvent(models, req.body).then(output => {
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
