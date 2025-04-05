
import { Router } from "express";
// import controllers
import {
    UserRegistrationForm,
    adminLogin,
    fetchQuizzQuestions,
    updateUserInformation,
    userDelete,
    adminHomePage
  } from "../controllers/userController.js";

// add middelware
import {authorize} from "../middleware/authorizeUser.js";
// by using this authorize() middelware we will be able to access req.user in the controller function

const route = Router();


route.post('/user-registration',UserRegistrationForm);

route.post('/admin-login',adminLogin);

route.get('/fetch-quizz-questions',authorize,fetchQuizzQuestions);

route.post('/update-user-information',authorize,updateUserInformation);

route.get('/admin-home-page',adminHomePage);

route.delete('/user-delete/:userid',userDelete);



export default route;

















