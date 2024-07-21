/**
 * @swagger
 * tags:
 *   name: Timesheets
 *   description: Operations related to timesheets
 */

/**
 * @swagger
 * /timesheets/create:
 *   post:
 *     summary: Create a new timesheet
 *     tags: [Timesheets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: integer
 *                 example: 1
 *               projectId:
 *                 type: integer
 *                 example: 2
 *               date:
 *                 type: string
 *                 format: date
 *                 example: '2024-07-21'
 *               hoursWorked:
 *                 type: integer
 *                 example: 8
 *               description:
 *                 type: string
 *                 example: Worked on feature X
 *     responses:
 *       201:
 *         description: Timesheet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 employeeId:
 *                   type: integer
 *                   example: 1
 *                 projectId:
 *                   type: integer
 *                   example: 2
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: '2024-07-21'
 *                 hoursWorked:
 *                   type: integer
 *                   example: 8
 *                 description:
 *                   type: string
 *                   example: Worked on feature X
 *       400:
 *         description: Employee or Project does not exist
 *       500:
 *         description: Error creating timesheet
 */

/**
 * @swagger
 * /timesheets/getAll:
 *   get:
 *     summary: Get all timesheets with pagination, sorting, and filtering
 *     tags: [Timesheets]
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
 *           example: 'date'
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           example: 'asc'
 *       - in: query
 *         name: employeeId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: minHours
 *         schema:
 *           type: integer
 *       - in: query
 *         name: maxHours
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of timesheets
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
 *                       employeeId:
 *                         type: integer
 *                         example: 1
 *                       projectId:
 *                         type: integer
 *                         example: 2
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: '2024-07-21'
 *                       hoursWorked:
 *                         type: integer
 *                         example: 8
 *                       description:
 *                         type: string
 *                         example: Worked on feature X
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 100
 *                     page:
 *                       type: number
 *                       example: 1
 *                     pageSize:
 *                       type: number
 *                       example: 10
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Error fetching timesheets
 */

/**
 * @swagger
 * /timesheets/get/{id}:
 *   get:
 *     summary: Get a timesheet by ID
 *     tags: [Timesheets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Timesheet found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 employeeId:
 *                   type: integer
 *                   example: 1
 *                 projectId:
 *                   type: integer
 *                   example: 2
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: '2024-07-21'
 *                 hoursWorked:
 *                   type: integer
 *                   example: 8
 *                 description:
 *                   type: string
 *                   example: Worked on feature X
 *       404:
 *         description: Timesheet not found
 *       500:
 *         description: Error fetching timesheet
 */

/**
 * @swagger
 * /timesheets/update/{id}:
 *   put:
 *     summary: Update a timesheet by ID
 *     tags: [Timesheets]
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
 *               employeeId:
 *                 type: integer
 *                 example: 1
 *               projectId:
 *                 type: integer
 *                 example: 2
 *               date:
 *                 type: string
 *                 format: date
 *                 example: '2024-07-21'
 *               hoursWorked:
 *                 type: integer
 *                 example: 8
 *               description:
 *                 type: string
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: Timesheet updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 employeeId:
 *                   type: integer
 *                   example: 1
 *                 projectId:
 *                   type: integer
 *                   example: 2
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: '2024-07-21'
 *                 hoursWorked:
 *                   type: integer
 *                   example: 8
 *                 description:
 *                   type: string
 *                   example: Updated description
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Timesheet not found
 *       500:
 *         description: Error updating timesheet
 */

/**
 * @swagger
 * /timesheets/delete/{id}:
 *   delete:
 *     summary: Delete a timesheet by ID
 *     tags: [Timesheets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Timesheet deleted successfully
 *       404:
 *         description: Timesheet not found
 *       500:
 *         description: Error deleting timesheet
 */
