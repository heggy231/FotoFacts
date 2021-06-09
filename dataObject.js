
// Uncomment this if you want to generate the data dynamically
// const faker = require('faker');

// const createData= (n) => {
//     let data = []

//     for(let i =0; i < n; i++){
//         let nPosts = Math.ceil(Math.random() * 5)

//         let posts = []

//         for(let j =0; j < nPosts; j++){
//             posts.push(faker.image.food())
//         }

//         data.push({
//             id: faker.datatype.uuid(),
//             name: faker.name.findName(),
//             email: faker.internet.email(),
//             avatar: faker.image.avatar(),
//             images: posts
//         })
//     }

//     return data

// }

// module.exports = createData( Math.ceil(Math.random() * 10) )

module.exports = {
    'f30494db-5d5a-4a7c-8dcf-a38edb2ef13e': {
      id: 'f30494db-5d5a-4a7c-8dcf-a38edb2ef13e',
      name: 'Birthday Party',
      email: 'Lexie.Parisian@yahoo.com',
      avatar: 'https://placeimg.com/128/128/nature',
      images: [
        'http://placeimg.com/640/480/food',
        'http://placeimg.com/640/480/food'
      ]
    },
    '0cdf49ae-e30b-4967-9722-d085196d1087': {
      id: '0cdf49ae-e30b-4967-9722-d085196d1087',
      name: 'Swimming Pool',
      email: 'Faye.Botsford96@yahoo.com',
      avatar: 'https://placeimg.com/128/128/nature',
      images: [
        'http://placeimg.com/640/480/food',
        'http://placeimg.com/640/480/food',
        'http://placeimg.com/640/480/food',
        'http://placeimg.com/640/480/food',
        'http://placeimg.com/640/480/food'
      ]
    },
    'e9cfa2b1-6ee1-44aa-87ea-e20d80258777': {
      id: 'e9cfa2b1-6ee1-44aa-87ea-e20d80258777',
      name: 'Walking out',
      email: 'Ron40@gmail.com',
      avatar: 'https://placeimg.com/128/128/nature',
      images: [ 'http://placeimg.com/640/480/food' ]
    },
    '257b0b42-91c3-4aa4-ba01-72ec73aa28fb': {
      id: '257b0b42-91c3-4aa4-ba01-72ec73aa28fb',
      name: 'Fun at the beach',
      email: 'Wilson.Moen12@yahoo.com',
      avatar: 'https://placeimg.com/128/128/nature',
      images: [
        'http://placeimg.com/640/480/food',
        'http://placeimg.com/640/480/food',
        'http://placeimg.com/640/480/food'
      ]
    },
    '8319b618-57b4-4d3d-8222-3c532c2754f7': {
      id: '8319b618-57b4-4d3d-8222-3c532c2754f7',
      name: 'Holiday at Sunset beach',
      email: 'Kaelyn.Spencer4@yahoo.com',
      avatar: 'https://placeimg.com/128/128/nature',
      images: [
        'http://placeimg.com/640/480/food',
        'http://placeimg.com/640/480/food',
        'http://placeimg.com/640/480/food'
      ]
    }
}
