import express from "express"
import cors from "cors"
import mainRoute from "./Routes/index.js"

const app = express();
app.use(express.json())
app.use(cors())

app.use("/api/v1", mainRoute)

const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is running on ${port} port.`);
})