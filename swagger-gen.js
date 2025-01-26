const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const mongooseToSwagger = require("mongoose-to-swagger");
const User = require("./models/user");
const Task = require("./models/task").model;
const userSchemaSwagger = mongooseToSwagger(User);
const taskSchemaSwagger = mongooseToSwagger(Task);
const doc = {
  openapi: "3.0.0",
  info: {
    title: "Contacts API",
    description: "Contacts API",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Local development server",
    },
    {
      url: "https://cse341-w3-wize.onrender.com",
      description: "render server",
    },
  ],
  components: {
    schemas: {
      User: userSchemaSwagger.properties,
      Task: taskSchemaSwagger.properties,
    },
  },
  tags: [
    {
      name: "Users",
      description: "Endpoints related to user operations",
    },
    {
      name: "Tasks",
      description: "Endpoints related to tasks or to-do items",
    },
  ],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
console.log("generated swagger file");
