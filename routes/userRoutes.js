
import { Router } from "express";
// import controllers
import {UserRegistrationForm,adminLogin,fetchQuizzQuestions,updateUserInformation} from "../controllers/userController.js";
// add middelware
import {getUser} from "../middleware/getUser.js";
// by using this getUser() middelware we will be able to access req.user in the controller function

const route = Router();


route.post('/user-registration',UserRegistrationForm);

route.get('/admin-login',adminLogin);

route.get('/fetch-quizz-questions',getUser,fetchQuizzQuestions);

route.get('/update-user-information',getUser,updateUserInformation);


export default route;

















