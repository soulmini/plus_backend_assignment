/**
@swagger
 * tags:
 *   name: Departments
 *   description: Operations related to departments
 */

/**
 * @swagger
 * /departments/create:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Engineering
 *               description:
 *                 type: string
 *                 example: Handles engineering tasks
 *               location:
 *                 type: string
 *                 example: Building A
 *     responses:
 *       201:
 *         description: Department created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Engineering
 *                 description:
 *                   type: string
 *                   example: Handles engineering tasks
 *                 location:
 *                   type: string
 *                   example: Building A
 *       500:
 *         description: Error creating department
 */

/**
 * @swagger
 * /departments/getAll:
 *   get:
 *     summary: Get all departments with pagination, filtering, and sorting
 *     tags: [Departments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           example: '1'
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: string
 *           example: '10'
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: 'id'
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           example: 'asc'
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of departments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Engineering
 *                       description:
 *                         type: string
 *                         example: Handles engineering tasks
 *                       location:
 *                         type: string
 *                         example: Building A
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 10
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *       500:
 *         description: Error fetching departments
 */