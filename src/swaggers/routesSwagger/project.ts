/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Operations related to projects
 */

/**
 * @swagger
 * /projects/create:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Project
 *               description:
 *                 type: string
 *                 example: This is a new project.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: '2024-01-01'
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: '2024-12-31'
 *               departmentId:
 *                 type: integer
 *                 example: 1
 *               employeeIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: New Project
 *                 description:
 *                   type: string
 *                   example: This is a new project.
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2024-01-01'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2024-12-31'
 *                 departmentId:
 *                   type: integer
 *                   example: 1
 *                 employeeProjects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       employeeId:
 *                         type: integer
 *                         example: 1
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error creating project
 */

/**
 * @swagger
 * /projects/getAll:
 *   get:
 *     summary: Get all projects with pagination, sorting, and filtering
 *     tags: [Projects]
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
 *         name: departmentId
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
 *     responses:
 *       200:
 *         description: List of projects
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
 *                       name:
 *                         type: string
 *                         example: New Project
 *                       description:
 *                         type: string
 *                         example: This is a new project.
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         example: '2024-01-01'
 *                       endDate:
 *                         type: string
 *                         format: date
 *                         example: '2024-12-31'
 *                       departmentId:
 *                         type: integer
 *                         example: 1
 *                       employeeProjects:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             employeeId:
 *                               type: integer
 *                               example: 1
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
 *         description: Invalid sorting parameters
 *       500:
 *         description: Error fetching projects
 */

/**
 * @swagger
 * /projects/get/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Project found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: New Project
 *                 description:
 *                   type: string
 *                   example: This is a new project.
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2024-01-01'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2024-12-31'
 *                 departmentId:
 *                   type: integer
 *                   example: 1
 *                 employeeProjects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       employeeId:
 *                         type: integer
 *                         example: 1
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error fetching project
 */

/**
 * @swagger
 * /projects/update/{id}:
 *   put:
 *     summary: Update a project by ID
 *     tags: [Projects]
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
 *               name:
 *                 type: string
 *                 example: Updated Project
 *               description:
 *                 type: string
 *                 example: This is an updated project description.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: '2024-01-01'
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: '2024-12-31'
 *               departmentId:
 *                 type: integer
 *                 example: 1
 *               employeeIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Updated Project
 *                 description:
 *                   type: string
 *                   example: This is an updated project description.
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2024-01-01'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2024-12-31'
 *                 departmentId:
 *                   type: integer
 *                   example: 1
 *                 employeeProjects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       employeeId:
 *                         type: integer
 *                         example: 1
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error updating project
 */

/**
 * @swagger
 * /projects/delete/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Project deleted successfully
 *       400:
 *         description: Invalid project ID
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error deleting project
 */
