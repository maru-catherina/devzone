
const form = document.getElementById('contact-form');
const submitButton = document.getElementById('submit');
const notification = document.getElementById('notification');
const notificationError = document.getElementById('notification-error');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Проверка ввода данных
if (  !message) {
    notificationError.classList.remove('hidden');
    setTimeout(() => {
      notificationError.classList.add('hidden');
    }, 3000);
    return;
  }
  

  // Отправка сообщения на email
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://formspree.io/', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(`name=${name}&email=${email}&message=${message}`);

  // Показываем оповещение
  notification.classList.remove('hidden');
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 3000);
form.reset(); // This will clear the form fields
});
 // Очистка формы после успешной отправки