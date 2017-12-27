
$(document).on("click", "#submit-sign-in", () =>{
    console.log("Test");
    const email  = $("#sign-in-email").val().trim().trim();
    const password  = $("#sign-in-password").val().trim().trim();
    // console.log(`${email} ${password}`);
    let user = {
        email,
        password
    }
    // console.log(user);
    $.ajax({
        url: "/signin",
        method: "GET",
        data: user
    }).then((User)=>{
        console.log(User);
        // res.redirect("/manager");
    });
});

$(document).on("click", "#submit-sign-up", () =>{
    const name  = $("#sign-up-name").val().trim().trim();
    const email  = $("#sign-up-email").val().trim().trim();
    const password  = $("#sign-up-password").val().trim().trim();
    const option = $("input[name = sign-up-radio]:checked").val();
    // console.log(`${name} ${email} ${password} ${option}`);
    let user = {
        name,
        email,
        password,
        option
    }
    // console.log(user);
    $.ajax({
        url: "/signup",
        method: "POST",
        data: user
    }).then((User)=>{
        console.log(User);
        // res.redirect("/manager");    
    });
});

