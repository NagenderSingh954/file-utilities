import connectDb from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT || 3000;

connectDb()
    .then(() => {
        app.on("error", (error) => {
            console.log("There is issue while connecting");
            throw error;
        });

        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Failed !!!", error);
    });