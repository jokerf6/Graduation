import router from "express"
import login from "../controllers/login/logincontrol"

router.post("/signup" , login.signup)
export default router;