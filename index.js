function sendMail(event) {
    event.preventDefault(); // prevent page reload

    const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    const serviceID = "service_68oovjk";
    const templateID = "template_w9qv3ey";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            console.log("SUCCESS", res);
            document.getElementById("contact-form").reset();
            document.getElementById("msg").innerText = "Message sent successfully!";
            document.getElementById("msg").style.color = "green";
        })
        .catch(err => {
            console.error("FAILED", err);
            document.getElementById("msg").innerText = "Failed to send. Please try again.";
            document.getElementById("msg").style.color = "red";
        });
}







