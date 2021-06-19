// pass in string message and view is string /path
const renderModal = (message, view) => {
  const body = document.querySelector("body");
  const messageDiv = document.createElement('div');
  messageDiv.className = "text-center alert alert-primary alert-box";
  messageDiv.innerHTML = `
    <span>
      ${message}
      <span aria-hidden="true" class="close">&times;</span>
    </span>
  `;
  messageDiv.addEventListener('click', () => {
    // alert("Success photos there!");
    // window.location.href = "/photos";
    window.location.href = view;
  });
  body.appendChild(messageDiv);
};
