// wait for page ready
document.addEventListener("DOMContentLoaded", () => {
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
    })
      .then((response) => {
        if (response.status === 200) {
          renderModal("Success! Photo Updated!", "/users/photos");
        } else {
          alert(
            "Error creating new photo!  Server Error code: " +
              response.status +
              "Try again."
          );
        }
      })
      .catch((err) => {
        console.info(err + " url: " + "/users/photos");
      });

    console.log("POSTed data to /uploadphoto");
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
