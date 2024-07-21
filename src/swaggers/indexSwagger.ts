/**
 * @swagger
 * /:
 *   get:
 *     summary: Root endpoint
 *     description: A simple endpoint to test server connectivity.
 *     responses:
 *       200:
 *         description: A message indicating the server is up and running
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello from server
 */



/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Protected endpoint
 *     description: A protected route that requires JWT authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A message indicating access to the protected route
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello user@example.com, you have access to this protected route!
 *       401:
 *         description: Unauthorized access - No token provided
 *       403:
 *         description: Forbidden access - Invalid token
 *       500:
 *         description: Internal server error
 */
