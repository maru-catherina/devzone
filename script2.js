document.addEventListener("DOMContentLoaded", function () {
const form = document.getElementById('contact-form');
const submitButton = document.getElementById('submit');
 
form.addEventListener('submit', async function(event)  {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const preferredMethod=document.querySelector('input[name="choice"]:checked')

  const phoneValid = /^\+?[0-9]{7,15}$/.test(phone);
  const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  // Проверка ввода данных
  if (!name) {
    alert("Please enter your name.");
    return;
}

if (!phoneValid && !emailValid) {
  alert("Please enter a valid phone number or email address.");
  return;
}

if (!preferredMethod) {
  alert("Please select your preferred method of contact.");
  return;
}
const formData = new FormData(form);
        try {
            const response = await fetch("https://formspree.io/f/xjkgdyzg", {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });
            
            if (response.ok) {
                alert("Your request has been sent successfully!");
                form.reset();
            } else {
                alert("There was an error sending your request. Please try again.");
            }
        } catch (error) {
            alert("Network error. Please check your connection and try again.");
        }
    });




form.reset(); // This will clear the form fields
});
 