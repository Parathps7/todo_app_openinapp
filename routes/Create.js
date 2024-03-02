const express = require('express')
const { createTask , createSubTask } = require('../controllers/createController');
const validate = require('../middleware/validateTokenHandler')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Create
 *   description: API operations Creating tasks and subtasks
 */


/**
 * @swagger
 * /api/create/task:
 *   post:
 *     summary: Create a new task
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
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: The description of the task
 *               due_date:
 *                 type: string
 *                 format: date
 *                 description: The due date of the task
 *             required:
 *               - title
 *               - description
 *               - due_date
 *     responses:
 *       '201':
 *         description: Task created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */

router.post('/task',validate,createTask);

/**
 * @swagger
 * /api/create/subtask:
 *   post:
 *     summary: Create a new subtask
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
 *               title:
 *                 type: string
 *                 description: The title of the parent task
 *               status:
 *                 type: number
 *                 description: The status of the subtask (0 for incomplete, 1 for complete)
 *             required:
 *               - task_id
 *     responses:
 *       '201':
 *         description: Subtask created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Task not found
 */

router.post('/subtask',validate,createSubTask);

module.exports = router;