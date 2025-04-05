

// admin login function:

document.getElementById('admin-login-form').addEventListener('submit',async function(e){
    const adminData = {
        adminName:document.getElementById('adminName').value,
        password:document.getElementById('password').value,
    }
    console.log('admin date: ',adminData);
    e.preventDefault();

    // call the backend and verify the credientials:
    try {
        const response = await fetch('http://localhost:3000/app/admin-login',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(adminData)
        });

        const data = await response.json();

        if (data.status===true) {
            // redirect to the admin home page:
            window.location.href = "../account/adminHome.html"
        } else {
            alert("Login failed. Enter correct credentials.");
        }
    } catch (error) {
        console.log('error:=> ',error);
        
    }

});
