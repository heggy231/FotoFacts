const usersList = document.getElementById("users-list");

usersList.addEventListener("click", event => {
  // alert(`delete button clicked id: ${event.target.getAttribute("data-userID")}`);
  // debugger;
  // console.log('event.target:', event.target);
  console.log('event.target', event.target);
  console.log('event.target.getAttribute("data-userID")', event.target.getAttribute('data-userID'));

  const deleteID = event.target.getAttribute('data-userID');

  // delete is strictly endpoint there is no body to send to server
  fetch(`/users/${deleteID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    } 
  })
  .then(response => {
    console.log('user deleted response.status:', response.status);
    renderModal("Success!! Deleted.", "/users");
  })
  .catch();
});