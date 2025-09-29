const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { body, param, validationResult } = require("express-validator");
const validateBodyTask = [
  // tarea1
  body("title")
    .isLength({ min: 1 })
    .withMessage("Title es requerido")
    .isString()
    .withMessage("title es un string")
    .trim()
    .escape(),
  body("descripcion")
    .optional()
    .isString()
    .withMessage("Descripcion es un string")
    .trim()
    .escape(),
    //<
];
const validateParamTaskId = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El id de la tarea tiene que ser mayor que 0 y valor positivo")
    .toInt(),
];

router.get("/", taskController.getTasks);
router.get("/:id", validateParamTaskId, taskController.getTaskById);
router.post("/", validateBodyTask, taskController.createTask);
router.put(
  "/:id",
  validateParamTaskId.concat(validateBodyTask),
  taskController.updateTask
);
router.delete("/:id", validateParamTaskId, taskController.deleteTask);
module.exports = router;
