// wait for page ready
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("signup");

  form.onsubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);
    const entries = formdata.entries();
    const data = Object.fromEntries(entries);

    // See API docs: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // body is the req.body and body is what I want to send to server
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => {
      // response variable check 300 code redirect
      // code 200
      // IF the RESPONSE STATUS is OK (200), THEN change the browser location.
      // https://stackoverflow.com/questions/39735496/redirect-after-a-fetch-post-call  Go to second answer
      // alert("photo listed!!!");

      // window.location.href = "/photos";

      // Response info
      // console.log("********** res.status ===>", response.status);  // if success status code is 200 here
      // console.log("********** res ===>", response.body); // ReadableStream {locked: false}0

      if (response.status === 200) {
        renderModal("Success! User account created!", "/users");
      } else {
        alert("Error creating new user!  Server Error code: " + response.status +  "Try again.");
      }
    })
    .catch( err => {
      console.info( err + " url: " + "/users");
    });

    console.log("POSTed data to /users");
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
