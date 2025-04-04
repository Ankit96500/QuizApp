

export const UserRegistrationForm = async function(req,res){

}


export const adminLogin = async function(req,res){
    
};


export const fetchQuizzQuestions = async function(req,res){
    const url = "https://opentdb.com/api.php?amount=10";
    const data = await fetch(url,{method:"GET"});
    const result = await data.json();
    console.log(result,"response from fetchQuizzQuestions function");
    res.status(200).json({status:true,questions:result.results});
}

export const updateUserInformation = async function(req,res){
    const {name,email,score} = req.body;
    console.log(name,email,score,"user data from client side");
    const user = await User.findOne({where:{email}});
    if(user){
        await User.update({name,email,score},{where:{id:user.id}})
        res.status(200).json({status:true,message:"User information updated successfully"});
    }else{
        res.status(404).json({status:false,message:"User not found"});
    }
};













