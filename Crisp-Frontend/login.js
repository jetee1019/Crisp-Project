
function logIn() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (email== null || email == "") {
        alert("Please enter the email.");
        window.location = "index.html";
        return false;
                }
    else if (password == null || password == "") {
         alert("Please enter the password.");
         window.location = "index.html";
         return false;
                }
    
    else {
        window.location.href = "welcome.html";
        //alert("Login successful");
        
       // return false;
}
}

//login.addEventListener('click', logIn);
