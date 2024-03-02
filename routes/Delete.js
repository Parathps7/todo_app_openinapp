const express = require('express')
const {deleteTask,deleteSubTask} = require('../controllers/deleteControllers');
const validate = require('../middleware/validateTokenHandler')
const router = express.Router()

// http://localhost:8080/api/delete/task/65e2203ad3728726950d35d3
/**
 * @swagger
 * /api/delete/task/{task_id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete
 *     responses:
 *       '200':
 *         description: Task deleted successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Task not found
 */
router.delete('/task/:task_id',validate,deleteTask);

/**
 * @swagger
 * /api/delete/subtask/{subtask_id}:
 *   delete:
 *     summary: Delete a subtask by ID
 *     tags:
 *       - Subtasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subtask_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subtask to delete
 *     responses:
 *       '200':
 *         description: Subtask deleted successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Subtask not found
 */

router.delete('/subtask/:subtask_id',validate,deleteSubTask);

module.exports = router;