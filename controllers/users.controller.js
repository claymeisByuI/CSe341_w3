const userRepository = require("../repositories").userRepository;

/**
 * Create a new user.
 *
 * #swagger.tags = ['Users']
 * #swagger.summary = 'Create a new user'
 * #swagger.requestBody = {
 *   required: true,
 *   content: {
 *     "application/json": {
 *       schema: { $ref: "#/components/schemas/User" },
 *       examples: {
 *         ExampleRequest: {
 *           summary: "Example for user creation",
 *           value: {
 *             username: "janeDoe",
 *             email: "jane@example.com",
 *             password: "PlainTextPassword",
 *             roles: ["user"]
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 * #swagger.responses[201] = {
 *   description: 'The user was successfully created.',
 *   content: {
 *     "application/json": {
 *       schema: { $ref: "#/components/schemas/User" }
 *     }
 *   }
 * }
 * #swagger.responses[500] = { description: 'Server error' }
 * #swagger.responses[401] = { description: 'Unauthorized' }
 */
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    const newUser = await userRepository.createUser({
      username,
      email,
      password,
      roles,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Retrieve all users.
 *
 * #swagger.tags = ['Users']
 * #swagger.summary = 'Retrieve a list of all users'
 * #swagger.responses[200] = {
 *   description: 'A list of user objects.',
 *   content: {
 *     "application/json": {
 *       schema: {
 *         type: 'array',
 *         items: { $ref: '#/components/schemas/User' }
 *       }
 *     }
 *   }
 * }
 * #swagger.responses[500] = { description: 'Server error' }

 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userRepository.findAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Retrieve a user by ID.
 *
 * #swagger.tags = ['Users']
 * #swagger.summary = 'Retrieve a single user by ID'
 * #swagger.parameters['id'] = {
 *   in: 'path',
 *   description: 'User ID (MongoDB ObjectId)',
 *   required: true,
 *   type: 'string'
 * }
 * #swagger.responses[200] = {
 *   description: 'The requested user.',
 *   content: {
 *     "application/json": {
 *       schema: { $ref: "#/components/schemas/User" }
 *     }
 *   }
 * }
 * #swagger.responses[401] = { description: 'Unauthorized' }
 * #swagger.responses[404] = { description: 'User not found' }
 * #swagger.responses[500] = { description: 'Server error' }
 */
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepository.findUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update a user by ID.
 *
 * #swagger.tags = ['Users']
 * #swagger.summary = 'Update a user by ID'
 * #swagger.parameters['id'] = {
 *   in: 'path',
 *   description: 'User ID (MongoDB ObjectId)',
 *   required: true,
 *   type: 'string'
 * }
 * #swagger.requestBody = {
 *   required: true,
 *   content: {
 *     "application/json": {
 *       schema: { $ref: "#/components/schemas/User" },
 *       examples: {
 *         ExampleUpdate: {
 *           summary: "Example for user update",
 *           value: {
 *             username: "johnDoeUpdated",
 *             email: "johnupdated@example.com",
 *             password: "NewPlainTextPassword",
 *             roles: ["admin"]
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 * #swagger.responses[200] = {
 *   description: 'The user was successfully updated.',
 *   content: {
 *     "application/json": {
 *       schema: { $ref: "#/components/schemas/User" }
 *     }
 *   }
 * }
 * #swagger.responses[401] = { description: 'Unauthorized' }
 * #swagger.responses[404] = { description: 'User not found' }
 * #swagger.responses[500] = { description: 'Server error' }
 */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, roles } = req.body;
    const updatedUser = await userRepository.updateUserById(id, {
      username,
      email,
      password,
      roles,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete a user by ID.
 *
 * #swagger.tags = ['Users']
 * #swagger.summary = 'Delete a user by ID'
 * #swagger.parameters['id'] = {
 *   in: 'path',
 *   description: 'User ID (MongoDB ObjectId)',
 *   required: true,
 *   type: 'string'
 * }
 * #swagger.responses[200] = {
 *   description: 'The user was successfully deleted.',
 *   content: {
 *     "application/json": {
 *       schema: { $ref: "#/components/schemas/User" }
 *     }
 *   }
 * }
 * #swagger.responses[401] = { description: 'Unauthorized' }
 * #swagger.responses[404] = { description: 'User not found' }
 * #swagger.responses[500] = { description: 'Server error' }
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userRepository.deleteUserById(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
