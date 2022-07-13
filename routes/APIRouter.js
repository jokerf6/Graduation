import Router  from "express";

import login from "./login.js"

const router = Router()
router.use("/signup" , login)

export default router