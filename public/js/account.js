

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
        
        if(response.ok){
            const data = await response.json();
            // stored token in local storage:
            localStorage.setItem("token",data.token);
            console.log(data,"response from post request");
            // redirect to quizz page:
            window.location.href = "../client/index.html";
        }
    } catch (error) {
        console.log(error,"Error in post request");
    }

});





















