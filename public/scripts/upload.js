// wait for page ready
document.addEventListener("DOMContentLoaded", () => {

  const renderModal = () => {
    const message = document.getElementById("message");
    const messageDiv = document.createElement('div');
    message.className = "text-center";
    messageDiv.innerText = "Success! your photo is up!";
    messageDiv.innerHTML = `
      <span>
        Success! your photo is up!
        <button>close</button>
      </span>
    `;
    messageDiv.addEventListener('click', () => {
      // alert("Success photos there!");
      window.location.href = "/photos";
    });
    message.appendChild(messageDiv);
  };

  const form = document.getElementById("upload");

  form.onsubmit = (e) => {
  e.preventDefault();

  const formdata = new FormData(e.target);
  const entries = formdata.entries();
  const data = Object.fromEntries(entries);

  // See API docs: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  fetch("/uploadphoto", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  console.log("POSTed data to /upload");
  };
});

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("upload");

//   form.onsubmit = (e)=> {
//     e.preventDefault();
    
//     const formdata = new FormData(e.target);
//     const entries = formdata.entries();
//     const data = Object.fromEntries(entries);

//     // See API docs: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//     fetch("/uploadphoto", {
//       "method": "POST",
//       "headers": {
//         'Content-Type': 'application/json'
//       },
//       "body": JSON.stringify(data) // body data type must match "Content-Type" header
//     })
//     console.log("POSTed data to /")
//   }
// })
