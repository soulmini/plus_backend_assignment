/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Operations related to employees
 */

/**
 * @swagger
 * /employees/create:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: '1234567890'
 *               departmentId:
 *                 type: integer
 *                 example: 1
 *               dateOfJoining:
 *                 type: string
 *                 format: date
 *                 example: '2023-01-01'
 *               position:
 *                 type: string
 *                 example: Software Engineer
 *               salary:
 *                 type: number
 *                 format: float
 *                 example: 60000.00
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 phoneNumber:
 *                   type: string
 *                   example: '1234567890'
 *                 departmentId:
 *                   type: integer
 *                   example: 1
 *                 dateOfJoining:
 *                   type: string
 *                   format: date
 *                   example: '2023-01-01'
 *                 position:
 *                   type: string
 *                   example: Software Engineer
 *                 salary:
 *                   type: number
 *                   format: float
 *                   example: 60000.00
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Error creating employee
 */

/**
 * @swagger
 * /employees/getAllData:
 *   get:
 *     summary: Get all employees with pagination, filtering, and sorting
 *     tags: [Employees]
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
 *         name: position
 *         schema:
 *           type: string
 *       - in: query
 *         name: departmentId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: dateOfJoining
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of employees
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
 *                         type: number
 *                         example: 1
 *                       firstName:
 *                         type: string
 *                         example: John
 *                       lastName:
 *                         type: string
 *                         example: Doe
 *                       email:
 *                         type: string
 *                         example: john.doe@example.com
 *                       phoneNumber:
 *                         type: string
 *                         example: '1234567890'
 *                       departmentId:
 *                         type: integer
 *                         example: 1
 *                       dateOfJoining:
 *                         type: string
 *                         format: date
 *                         example: '2023-01-01'
 *                       position:
 *                         type: string
 *                         example: Software Engineer
 *                       salary:
 *                         type: number
 *                         format: float
 *                         example: 60000.00
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 10
 *                     page:
 *                       type: number
 *                       example: 1
 *                     pageSize:
 *                       type: number
 *                       example: 10
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Error fetching employees
 */

/**
 * @swagger
 * /employees/getData/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 phoneNumber:
 *                   type: string
 *                   example: '1234567890'
 *                 departmentId:
 *                   type: integer
 *                   example: 1
 *                 dateOfJoining:
 *                   type: string
 *                   format: date
 *                   example: '2023-01-01'
 *                 position:
 *                   type: string
 *                   example: Software Engineer
 *                 salary:
 *                   type: number
 *                   format: float
 *                   example: 60000.00
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Error fetching employee
 */

/**
 * @swagger
 * /employees/update/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: '1234567890'
 *               departmentId:
 *                 type: integer
 *                 example: 1
 *               dateOfJoining:
 *                 type: string
 *                 format: date
 *                 example: '2023-01-01'
 *               position:
 *                 type: string
 *                 example: Software Engineer
 *               salary:
 *                 type: number
 *                 format: float
 *                 example: 60000.00
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 phoneNumber:
 *                   type: string
 *                   example: '1234567890'
 *                 departmentId:
 *                   type: integer
 *                   example: 1
 *                 dateOfJoining:
 *                   type: string
 *                   format: date
 *                   example: '2023-01-01'
 *                 position:
 *                   type: string
 *                   example: Software Engineer
 *                 salary:
 *                   type: number
 *                   format: float
 *                   example: 60000.00
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Error updating employee
 */

/**
 * @swagger
 * /employees/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Error deleting employee
 */
