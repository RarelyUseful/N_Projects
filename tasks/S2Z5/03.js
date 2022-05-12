// npm i express
// npm i mongodb
// npm i dotenv
// npm i http-status

require("dotenv").config();
const express = require("express");
const httpStatus = require("http-status");
const db = require("./db");

const app = express();
app.use(express.json());

db.init()
  .then(() => {
    app.get("/tasks", async (req, res) => {
      const tasks = await db.getTasks();
      res.send(tasks);
    });

    app.post("/tasks", async (req, res) => {
      const newTask = {
        task: req.body.task,
        description: req.body.description,
        isCompleted: req.body.isCompleted,
      };

      if (newTask.task && newTask.description && newTask.isCompleted != null) {
        const result = await db.addTask(newTask);

        res.statusCode = result.insertedId ? httpStatus.CREATED : httpStatus.INTERNAL_SERVER_ERROR;
      } else {
        res.statusCode = httpStatus.BAD_REQUEST;
      }

      res.send();
    });
  })
  .finally(() => {
    app.get("/heartbeat", (req, res) => {
      res.send(new Date());
    });

    app.listen(process.env.PORT, () => console.log("server started"));
  });
