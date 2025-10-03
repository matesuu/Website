function sendMail(){
    let parms = {

        name : document.getElementById("Name").value,
        email : document.getElementById("Email").value,
        message: document.getElementById("Message").value,
    }

    emailjs.send("service_68oovjk","template_ykn2wau",parms).then(alert("Email Sent!!"))
}