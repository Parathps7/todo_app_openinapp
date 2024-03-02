const express = require('express')
const {registerUser,loginUser,currentUser} = require('../controllers/userController');
const validate = require('../middleware/validateTokenHandler')
const router = express.Router()

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               priority:
 *                 type: number
 *           example:
 *             username: John Doe
 *             email: john@example.com
 *             password: password123
 *             phone_number: "1234567890"
 *             priority: 2
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/register',registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: john@example.com
 *             password: password123
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

router.post('/login',loginUser);

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Get current user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Current user retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.get('/current',validate,currentUser);

module.exports = router;