// pass in string message and view is string /path
const renderModal = (message, view) => {
  const body = document.querySelector("body");
  const messageDiv = document.createElement("div");
  messageDiv.className = "text-center alert alert-primary alert-box";
  messageDiv.innerHTML = `
    <span>
      ${message}
      <span aria-hidden="true" class="close">&times;</span>
    </span>
  `;
  messageDiv.addEventListener("click", () => {
    // alert("Success photos there!");
    // window.location.href = "/photos";
    // if (view) {
    window.location.href = view;
    // } else {
    //   location.reload();
    // }
  });
  body.appendChild(messageDiv);
};

// setting global variable to window obj
// window.renderModal = renderModal;
