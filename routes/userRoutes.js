
import { Router } from "express";
// import controllers
import {UserRegistrationForm,adminLogin,fetchQuizzQuestions,updateUserInformation} from "../controllers/userController.js";


const route = Router();


route.get('/user-registration',UserRegistrationForm);

route.get('/admin-login',adminLogin);

route.post('/fetch-quizz-questions',fetchQuizzQuestions);

route.get('/update-user-information',updateUserInformation);




















