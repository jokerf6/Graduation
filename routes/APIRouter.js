import Router  from "express";

import login from "./login.js"

const router = Router()
router.use("/login" , login)

export default router