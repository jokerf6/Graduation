import Router  from "express";
import login from "./login.js"
import homepage from "./homepage.js"
import signup from "./register.js"

const router = Router()
router.use("/" , homepage)
router.use("/" , login)
router.use("/" , signup)

export default router