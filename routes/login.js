import { Router } from "express"
import login from "../controllers/login/logincontrol.js"
const router  = Router()
router.get('/signup', (req, res) => {
    console.log("yes")
  })
//router.post("/signup" , login.signup)
export default router