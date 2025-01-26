// tasks.controller.js

const Task = require("../models/task").model; // Adjust path as needed

const createTask = async (req, res) => {
  /*
       #swagger.tags = ['Tasks']
       #swagger.summary = 'Create a new task'
       #swagger.requestBody = {
         required: true,
         content: {
           "application/json": {
             schema: { $ref: "#/components/schemas/Task" },
             examples: {
               ExampleRequest: {
                 summary: "Sample Task Creation",
                 value: {
                   title: "Buy groceries",
                   description: "Milk, eggs, bread",
                   status: "to-do",
                   priority: "medium",
                   dueDate: "2025-02-02T00:00:00.000Z",
                   assignedTo: "63ab9a0bcf8c0a12ab0dc345"
                 }
               }
             }
           }
         }
       }
       #swagger.responses[201] = {
         description: 'The task was successfully created.',
         content: {
           "application/json": {
             schema: { $ref: "#/components/schemas/Task" }
           }
         }
       }
       #swagger.responses[400] = { description: 'Invalid input' }
       #swagger.responses[500] = { description: 'Server error' }
     */
  // Extract fields from request body
  const { title, description, status, priority, dueDate, assignedTo } =
    req.body;

  // Create a new Task document
  const newTask = new Task({
    title,
    description,
    status,
    priority,
    dueDate,
    assignedTo,
  });

  // Save to the database
  const savedTask = await newTask.save();

  return res.status(201).json(savedTask);
};

const getAllTasks = async (req, res) => {
  /*
       #swagger.tags = ['Tasks']
       #swagger.summary = 'Get all tasks'
       #swagger.responses[200] = {
         description: 'A list of all tasks.',
         content: {
           "application/json": {
             schema: {
               type: 'array',
               items: { $ref: "#/components/schemas/Task" }
             }
           }
         }
       }
       #swagger.responses[500] = { description: 'Server error' }
     */
  const tasks = await Task.find();
  //.populate("assignedTo", "username email")
  // .populate('assignedTo') will replace the assignedTo field with the user document (only username and email)
  return res.status(200).json(tasks);
};

const getTaskById = async (req, res) => {
  /*
       #swagger.tags = ['Tasks']
       #swagger.summary = 'Get a task by ID'
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'The Task ID',
         required: true,
         type: 'string'
       }
       #swagger.responses[200] = {
         description: 'The requested task.',
         content: {
           "application/json": {
             schema: { $ref: "#/components/schemas/Task" }
           }
         }
       }
       #swagger.responses[404] = { description: 'Task not found' }
       #swagger.responses[500] = { description: 'Server error' }
     */
  const { id } = req.params;

  const task = await Task.findById(id);
  //     .populate(
  //   "assignedTo",
  //   "username email",
  // )
  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  return res.status(200).json(task);
};

const updateTask = async (req, res) => {
  /*
      #swagger.tags = ['Tasks']
      #swagger.summary = 'Update an existing task by ID'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'The Task ID',
        required: true,
        type: 'string'
      }
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Task" },
            examples: {
              ExampleUpdate: {
                summary: "Sample Task Update",
                value: {
                  title: "Updated Task Title",
                  description: "Updated description",
                  status: "in-progress",
                  priority: "high",
                  dueDate: "2025-03-01T00:00:00.000Z"
                }
              }
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'The task was successfully updated.',
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Task" }
          }
        }
      }
      #swagger.responses[404] = { description: 'Task not found' }
      #swagger.responses[500] = { description: 'Server error' }
    */
  const { id } = req.params;
  const { title, description, status, priority, dueDate, assignedTo } =
    req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { title, description, status, priority, dueDate, assignedTo },
    { new: true },
  );
  //    .populate("assignedTo", "username email")
  if (!updatedTask) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  return res.status(200).json(updatedTask);
};

const deleteTask = async (req, res) => {
  /*
      #swagger.tags = ['Tasks']
      #swagger.summary = 'Delete a task by ID'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'The Task ID',
        required: true,
        type: 'string'
      }
      #swagger.responses[200] = {
        description: 'Task deleted successfully.',
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Task" }
          }
        }
      }
      #swagger.responses[404] = { description: 'Task not found' }
      #swagger.responses[500] = { description: 'Server error' }
    */
  const { id } = req.params;

  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  return res.status(200).json({
    message: "Task deleted successfully",
    data: deletedTask, // Optional: return the deleted task data
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
