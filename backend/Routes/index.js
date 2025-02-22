import express from "express"
import userRoute from "./userRoute.js"
import todoRoute from "./todoRoute.js"

const router = express.Router();

router.use("/user", userRoute)
router.use("/todo", todoRoute)

export default router;