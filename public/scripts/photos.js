const photosList = document.getElementById("photos-list");

photosList.addEventListener('click', (event) => {
  console.log(event.target.getAttribute('data-photoid'));
  const deleteID = event.target.getAttribute('data-photoid');
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