
let emailExist = document.getElementById('emailExist');

// user login function
document.getElementById('user-registration-form').addEventListener('submit',async function(e){
    // handel form submit:
    const userData = {
        name:document.getElementById('name').value,
        email:document.getElementById('email').value,
        location:document.getElementById('location').value,
    }
    console.log('userdata:',userData);
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/app/user-registration',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userData)
        });
        
        const data = await response.json();
        // if user email already exist and their attempts also invalid: then show the message:
        if(data.entry===false && data.status===false){
            alert(`You cannot take this quiz anymore`);

            return;
        }
        if(data.status===true){
            // stored token in local storage:
            localStorage.setItem("token",data.token);
            console.log(data,"response from post request");
            // redirect to quiz page:
            window.location.href = "../client/index.html";
        }
    } catch (error) {
        console.log(error,"Error in post request");
    }

});


// this method is basically check if user already exist or not: if exixt redirect to quiz page
if (localStorage.getItem("token")) {
    // redirect to quiz page:
    window.location.href = "../client/index.html";
}





























