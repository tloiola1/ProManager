
$(document).on("click", "#submit-sign-in", () =>{
    const email  = $("#sign-in-email").val().trim().trim();
    const password  = $("#sign-in-password").val().trim().trim();
    // console.log(`${email} ${password}`);
    let user = {
        email,
        password
    };
    // console.log(`Before UserLog SignIn`);
    // console.log(user);
    $.ajax({
        url: "/signin",
        method: "GET",
        data: user
    }).then((User, res)=>{
        // console.log(`After UserLog SignIn`);
        // console.log(User);
        localStorage.setItem("name", User[0].firstname);
        localStorage.setItem("id", User[0]._id);

        // const nome = localStorage.getItem("name");
        // console.log(nome);
        if(User[0].title === "manager"){
            window.location = "/manager";
        }
        else{
            res.redirect("/renters");
        }
    });
});

$(document).on("click", "#submit-sign-up", () =>{
    const firstname  = $("#sign-up-firstname").val().trim().trim();
    const lastname  = $("#sign-up-lastname").val().trim().trim();
    const email  = $("#sign-up-email").val().trim().trim();
    const password  = $("#sign-up-password").val().trim().trim();
    const phone  = $("#sign-up-phone").val().trim().trim();
    const title = $("input[name = sign-up-radio]:checked").val();
    // console.log(`${name} ${email} ${password} ${option}`);
    let user = {
        firstname,
        lastname,
        email,
        password,
        title
    }
    // console.log(`Before UserLog SignUp`);
    // console.log(user);
    $.ajax({
        url: "/signup",
        method: "POST",
        data: user
    }).then((User)=>{
        // console.log(`After UserLog SignUp`);
        // console.log(User);
        localStorage.setItem("name", User.firstname);
        localStorage.setItem("id", User._id);
        //
        if(User.title === "manager"){
            window.location = "/manager";
        }
        else{
            window.location = "/renters";
        }    
    });
});

