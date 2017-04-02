$(document).ready(function() {
    function loginAjax() {
        let username = document.getElementById("username").value,
            password = document.getElementById("password").value;
        $.ajax({
            url:"http://127.0.0.1:5000/api/log_in",
            type:"POST",
            dataType:"json",
            data:{
                "user_name":username,
                "password":password
            },
            success:function(result){
                console.log("Login succeeded");
                window.sessionStorage.setItem("username", username);
                window.sessionStorage.setItem("password", password);
                $(".modal").modal("hide");
                $(document.getElementById("account").children).toggle();
                userId = result['user_id'];
                document.getElementById("user").appendChild(document.createTextNode(result['first_name']));
            },
            error:function(msg){
                console.error(msg);
            }
        });
    }
    getLoginInfo(window.sessionStorage.getItem("username"), window.sessionStorage.getItem("password"));
    function getLoginInfo(username, password) {
        if (username&&password) {
            document.getElementById("username").value = username;
            document.getElementById("password").value = password;
            loginAjax();
        }
    }

    $(document.getElementById("login-button")).on("click", function(){
        loginAjax();
    });

    $(document.getElementById("signup-button")).on("click", function(){
        let username = document.getElementById("newUsername").value,
            password = document.getElementById("newPassword").value,
            firstName = document.getElementById("inputFirstName").value;
        $.ajax({
            url:"http://127.0.0.1:5000/api/sign_up",
            type:"POST",
            dataType:"json",
            data:{
                "first_name":firstName,
                "last_name":document.getElementById("inputLastName").value,
                "user_name":username,
                "password":password,
                "email":document.getElementById("email").value
            },
            success:function(result){
                console.log("Sign up succeeded");
                window.sessionStorage.setItem("username", username);
                window.sessionStorage.setItem("password", password);
                $(".modal").modal("hide");
                $(document.getElementById("account").children).toggle();
                userId = result['user_id'];
                document.getElementById("user").appendChild(document.createTextNode(firstName));
                $(document.getElementsByClassName('login-required')).html("<h1 style='color:red;'>Login Required</h1>");
            },
            error:function(msg){
                console.error(msg);
            }
        });
    });

    $(document.getElementById("logout")).on("click", function() {
        window.sessionStorage.clear();
        location.reload();
    });
});