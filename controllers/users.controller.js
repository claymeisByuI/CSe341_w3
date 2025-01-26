const User = require("../models/user"); // Adjust the path to your User Mongoose model

exports.createUser = async (req, res) => {
  /*
       #swagger.tags = ['Users']
       #swagger.summary = 'Create a new user'
       #swagger.requestBody = {
         required: true,
         content: {
           "application/json": {
             schema: { $ref: "#/components/schemas/User" },
             examples: {
               ExampleRequest: {
                 summary: "Example for user creation",
                 value: {
                   username: "janeDoe",
                   email: "jane@example.com",
                   password: "PlainTextPassword",
                   roles: ["user"]
                 }
               }
             }
           }
         }
       }
       #swagger.responses[201] = {
         description: 'The user was successfully created.',
         content: {
           "application/json": {
             schema: { $ref: "#/components/schemas/User" }
           }
         }
       }
       #swagger.responses[400] = { description: 'Invalid input' }
       #swagger.responses[500] = { description: 'Server error' }
     */
  const { username, email, password, roles } = req.body;

  const user = new User({
    username,
    email,
    password,
    roles,
  });

  const newUser = await user.save();
  return res.status(201).json(newUser);
};

exports.getAllUsers = async (req, res) => {
  /*
       #swagger.tags = ['Users']
       #swagger.summary = 'Retrieve a list of all users'
       #swagger.responses[200] = {
         description: 'A list of user objects.',
         content: {
           "application/json": {
             schema: {
               type: 'array',
               items: { $ref: '#/components/schemas/User' }
             }
           }
         }
       }
       #swagger.responses[500] = { description: 'Server error' }
     */
  const users = await User.find({});
  return res.status(200).json(users);
};

exports.getUserById = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Retrieve a single user by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'User ID (MongoDB ObjectId)',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'The requested user.',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/User" }
        }
      }
    }
    #swagger.responses[404] = { description: 'User not found' }
    #swagger.responses[500] = { description: 'Server error' }
  */
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json(user);
};

exports.updateUser = async (req, res) => {
  /*
     #swagger.tags = ['Users']
     #swagger.summary = 'Update a user by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'User ID (MongoDB ObjectId)',
       required: true,
       type: 'string'
     }
     #swagger.requestBody = {
       required: true,
       content: {
         "application/json": {
           schema: { $ref: "#/components/schemas/User" },
           examples: {
             ExampleUpdate: {
               summary: "Example for user update",
               value: {
                 username: "johnDoeUpdated",
                 email: "johnupdated@example.com",
                 password: "NewPlainTextPassword",
                 roles: ["admin"]
               }
             }
           }
         }
       }
     }
     #swagger.responses[200] = {
       description: 'The user was successfully updated.',
       content: {
         "application/json": {
           schema: { $ref: "#/components/schemas/User" }
         }
       }
     }
     #swagger.responses[404] = { description: 'User not found' }
     #swagger.responses[500] = { description: 'Server error' }
   */
  const { id } = req.params;
  const { username, email, password, roles } = req.body;

  // If password is being updated, hash it here (not shown).
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { username, email, password, roles },
    { new: true }, // Return updated user
  );

  if (!updatedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json(updatedUser);
};

exports.deleteUser = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Delete a user by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'User ID (MongoDB ObjectId)',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'The user was successfully deleted.',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/User" }
        }
      }
    }
    #swagger.responses[404] = { description: 'User not found' }
    #swagger.responses[500] = { description: 'Server error' }
  */
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    message: "User deleted successfully",
    data: deletedUser,
  });
};
