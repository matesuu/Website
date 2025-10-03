function sendMail(){
    
    var params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

const serviceID = "service_68oovjk";
const templateID = "template_w9qv3ey";

emailjs.send(serviceID, templateID, params)
.then(
    res => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Email Sent Successfully! I will get back to you shortly.");

})
.catch((err) => console.log(err));

}
