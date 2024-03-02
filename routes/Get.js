const express = require('express')
const { getTask , getSubTask } = require('../controllers/getControllers');
const validate = require('../middleware/validateTokenHandler')
const router = express.Router()

/**
 * @swagger
 * /api/get/task:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of tasks
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.get('/task',validate,getTask);

/**
 * @swagger
 * /api/get/subtask:
 *   get:
 *     summary: Get all subtasks
 *     tags:
 *       - Subtasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: task_id
 *         schema:
 *           type: string
 *         description: The ID of the task to get subtasks for
 *     responses:
 *       '200':
 *         description: A list of subtasks
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Internal server error
 */

router.get('/subtask',validate,getSubTask);
// http://localhost:8080/api/get/subtask?task_id=65e2203ad3728726950d35d3

module.exports = router;