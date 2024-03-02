const express = require('express')
const { updateTask , updateSubTask } = require('../controllers/updateControllers');
const validate = require('../middleware/validateTokenHandler')
const router = express.Router()

/**
 * @swagger
 * /api/update/task:
 *   put:
 *     summary: Update a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_id:
 *                 type: string
 *               due_date:
 *                 type: string
 *               status:
 *                 type: string
 *           example:
 *             task_id: "65e2203ad3728726950d35d3"
 *             due_date: "2024-03-15T00:00:00Z"
 *             status: "TODO"
 *     responses:
 *       '200':
 *         description: Task updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Internal server error
 */
router.put('/task',validate,updateTask);

/**
 * @swagger
 * /api/update/subtask:
 *   put:
 *     summary: Update a subtask
 *     tags:
 *       - Subtasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subtask_id:
 *                 type: string
 *           example:
 *             subtask_id: "65e2203ad3728726950d35d3"
 *             status: "65e2203ad3728726950d35d3"
 *     responses:
 *       '200':
 *         description: Subtask updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Subtask not found
 *       '500':
 *         description: Internal server error
 */

router.put('/subtask',validate,updateSubTask);

module.exports = router;