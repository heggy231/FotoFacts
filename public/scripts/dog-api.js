const generateDogBtn = document.getElementById('generate-dog-btn');

generateDogBtn.addEventListener('click', ()=>{

    console.log("get a dog picture please")

    axios.get("https://dog.ceo/api/breeds/image/random")
    .then(res => {
        console.log(res.data);

        // console.log(res.data.myLittle.pony) // This will throw an error
        const dogDiv = document.getElementById('dog-image-div');

        // // This is adding an element
        // const dogImageTag = document.createElement('img')
        // dogImageTag.setAttribute('src', res.data.message)
        // dogDiv.appendChild(dogImageTag);

        // This is replacing an element
        dogDiv.innerHTML= `<img src="${res.data.message}" />`;
    })
    .catch( err => {
        // Gracefully Display an error here
        const dogDiv = document.getElementById('dog-image-div');
        dogDiv.innerHTML= `<h1>Woops</h1>`;
    });
})

var checkoutBtn = document.getElementById('checkout-btn');

checkoutBtn.addEventListener('click', ()=>{
    console.log("MONEY PLEASE!");
})
