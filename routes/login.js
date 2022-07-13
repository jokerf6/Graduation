import Router from "express"
import login from "../controllers/login/logincontrol.js"
const router = Router();
router.get("/signup" , (req , res)=>{
    res.send("hello");
}) 
router.post("/signup" , login.signup)
export default router;