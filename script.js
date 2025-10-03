function sendMail(){
    let parms = {

        const form = document.getElementById('')

        name : document.getElementById("Name").value,
        email : document.getElementById("Email").value,
        message: document.getElementById("Message").value,
    }

    emailjs.send("service_68oovjk","template_w9qv3ey",parms).then(alert("Email Sent!!"))
}