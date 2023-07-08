import express from "express";
import cors from "cors";
import routes from "./routes.js";
import dotenv from "dotenv";

// Load variables
dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/the-ewc/api', routes);

// Start the server
app.listen(port, () => {
  console.log(`Sever is running on port: ${port}`)
});
