import { Router } from "express"
import login from "../controllers/login/logincontrol.js"
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const router  = Router()
router.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname+'/../views/html/login.html'));
  })
router.post("/signin" , login.signin)
export default router