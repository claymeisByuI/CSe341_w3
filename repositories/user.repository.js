const User = require("../models/user"); // Adjust the path as needed

/**
 * Create a new user in the database.
 * @param {Object} userData - The user data (username, email, password, roles).
 * @returns {Promise<Object>} The newly created user.
 */
exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

/**
 * Retrieve all users from the database.
 * @returns {Promise<Array>} An array of user objects.
 */
exports.findAllUsers = async () => {
  return await User.find({});
};

/**
 * Find a user by their ID.
 * @param {String} id - The user's MongoDB ObjectId.
 * @returns {Promise<Object|null>} The user object if found; otherwise, null.
 */
exports.findUserById = async (id) => {
  return await User.findById(id);
};

exports.findUserByUserName = async (findUser) => {
  return await User.findOne({ username: findUser }).exec();
};

/**
 * Update a user by their ID.
 * @param {String} id - The user's MongoDB ObjectId.
 * @param {Object} updateData - The fields to update (e.g., username, email, password, roles).
 * @returns {Promise<Object|null>} The updated user object if found; otherwise, null.
 */
exports.updateUserById = async (id, updateData) => {
  // If password is being updated, hash it here or use a pre-save hook in your User model.
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

/**
 * Delete a user by their ID.
 * @param {String} id - The user's MongoDB ObjectId.
 * @returns {Promise<Object|null>} The deleted user object if found; otherwise, null.
 */
exports.deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};
