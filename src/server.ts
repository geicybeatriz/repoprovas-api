import app from "./app.js";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();

const port = +process.env.PORT || 5000;

app.listen(port, () => 
    console.log(chalk.bold.green(`Server is up and running on port ${port}`))
);