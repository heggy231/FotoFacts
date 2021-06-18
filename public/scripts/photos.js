const photosList = document.getElementById("photos-list");

photosList.addEventListener('click', (event) => {
  console.log("event.target.getAttribute('data-photoid'):", event.target.getAttribute('data-photoid'));
  const deleteID = event.target.getAttribute('data-photoid');
  fetch(`/photos/${deleteID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((response) => {
    // response variable check 300 code redirect
    // code 200
    // IF the RESPONSE STATUS is OK (200), THEN change the browser location.
    // https://stackoverflow.com/questions/39735496/redirect-after-a-fetch-post-call
    // alert("photo listed!!!");

    // window.location.href = "/photos";
    renderModal("Success! Your image is deleted", "/photos");

  })
  .catch((err) => {
    console.info(err + " url: " + "/uploadphoto");
  });
});


// handleClick(e) {
// 	const attribute = e.target.getAttribute('data-someAttribute');
// 	console.log(attribute);
// }

// const element1 = document.querySelector('.a-class')
// const element2 = document.querySelector('.another-class')

// body.addEventListener('click', event => {
//   if (event.target !== element1 && event.target !== element2) {
//     return
  // }
  //handle click
// }