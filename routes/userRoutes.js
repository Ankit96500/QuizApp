
import { Router } from "express";
// import controllers
import {UserRegistrationForm,adminLogin,fetchQuizzQuestions,updateUserInformation} from "../controllers/userController.js";
// add middelware
import {authorize} from "../middleware/authorizeUser.js";
// by using this getUser() middelware we will be able to access req.user in the controller function

const route = Router();


route.post('/user-registration',UserRegistrationForm);

route.get('/admin-login',adminLogin);

route.get('/fetch-quizz-questions',authorize,fetchQuizzQuestions);

route.post('/update-user-information',authorize,updateUserInformation);


export default route;

















