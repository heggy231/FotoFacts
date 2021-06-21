
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
<<<<<<< HEAD
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  .then((response) => {
    // response variable check 300 code redirect
    // code 200
    // IF the RESPONSE STATUS is OK (200), THEN change the browser location.
    // https://stackoverflow.com/questions/39735496/redirect-after-a-fetch-post-call
    // alert("photo listed!!!");

    // window.location.href = "/photos";
    renderModal("Success! Your image is created!", '/photos');

  })
  .catch((err) => {
    console.info(err + " url: " + "/uploadphoto");
=======
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header
>>>>>>> main
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
