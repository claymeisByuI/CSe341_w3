const express = require("express");
const cors = require("cors");
const app = express();

require("express-async-errors");

// Requiring swagger-gen.js will run its code immediately.
require("./swagger-gen");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const db = require("./models");
const mgoo = require("mongoose");
const { Error } = require("mongoose");
db.mongoose
  .connect(db.url, {})
  .then(() => {
    console.log("Mongoose connected thru MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to database, Reason:", err);
    process.exit();
  });

app

  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/", require("./routes"))
  .use(function handleValidationError(error, req, res, next) {
    if (error instanceof mgoo.Error.ValidationError) {
      return res.status(400).send({
        httpStatus: 400,
        message: error.message,
        errorDetails: {},
      });
    }
    next(error);
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
