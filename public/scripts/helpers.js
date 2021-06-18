// pass in string message and view is /path
const renderModal = (message, view) => {

    const body = document.querySelector("body");
    const messageDiv = document.createElement('div');
    messageDiv.className = "modal";
    messageDiv.innerHTML = `
      <span>
        ${message}
        <button>close</button>
      </span>
    `;
    messageDiv.addEventListener('click', () => {
      // alert("Success photos there!");
      window.location.href = view;
    });
    body.appendChild(messageDiv);

};

