const alert = (status, message) => {
  const container = document.getElementsByClassName('message')[0];
  const line = container.firstChild;
  line.innerHTML = message;
  container.classList.remove('hidden');
  line.className = status;
  setTimeout(() => {
    container.classList.add('hidden');
  }, 3000);
};

export default alert;
