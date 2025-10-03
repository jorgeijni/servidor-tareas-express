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

/**
 * @swagger
 * /tasks:
 *  get:
 *   summary: Obtener todas las tareas
 *   responses:
 *     200:
 *       description: Lista de todas las tareas
 *       content:
 *        application/json:
 *          schema: 
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Task'
 */
router.get("/", taskController.getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *   summary: Obtener una tarea por id
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *      description: El id de la tarea
 *   responses:
 *     200:
 *       description: Lista de todas las tareas
 *       content:
 *        application/json:
 *          schema: 
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Task'
 *     404:
 *      description: Tarea no encontrada
 */
router.get("/:id", validateParamTaskId, taskController.getTaskById);
/**
* @swagger
* /tasks:
*  post:
*   summary: Crear una nueva tarea
*   requestBody:
*     required: true
*     content:
*       application/json:
*         schema:
*           $ref: '#/components/schemas/Task'
*   responses:
*     200:
*       description: Crea una nueva tarea
*       content:
*         application/json:
*           schema: 
*             type: array
*             items:
*               $ref: '#/components/schemas/Task'
*     400:
*       description: Error de validación
*/
router.post("/", validateBodyTask, taskController.createTask);

/**
* @swagger
* /tasks:
*  put:
*   summary: Actualizar una nueva tarea
*   parameters:
*    - in: path
*      name: id
*      required: true
*      schema:
*        type: integer
*      description: Id de la tarea
*   requestBody:
*     required: true
*     content:
*       application/json:
*         schema:
*           $ref: '#/components/schemas/Task'
*   responses:
*     200:
*       description: Crea una nueva tarea
*       content:
*         application/json:
*           schema: 
*             type: array
*             items:
*               $ref: '#/components/schemas/Task'
*     404:
*      description: Tarea no encontrada
*     400:
*       description: Error de validación
*/
router.put(
  "/:id",
  validateParamTaskId.concat(validateBodyTask),
  taskController.updateTask
);


/**
 * @swagger
 * /tasks/{id}:
 *  delete:
 *   summary: Eliminar una tarea existente
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *      description: El id de la tarea
 *   responses:
 *     200:
 *       description: Tareas eliminada correctamente      
 *     404:
 *      description: Tarea no encontrada
 */
router.delete("/:id", validateParamTaskId, taskController.deleteTask);
module.exports = router;
