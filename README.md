# [FotoFacts](https://github.com/heggy231/FotoFacts)

## prettier-eslint-cli
> npm i -D prettier-eslint-cli

> Add this to your package.json scripts section: prettier-eslint --write \"./**/*.js\

## how to run:
- > npm i // gets your all the project dependencies listed in `package.json`
- Create .env file on your root directory.  Add your own FACEBOOK_CLIENT_ID=*******
FACEBOOK_SECRET=*******

GITHUB_CLIENT_ID=******
GITHUB_CLIENT_SECRET=******

DATABASE_USERNAME=******
DATABASE_PASSWORD=******

DATABASE_NAME=******
HOST=******


// inside of your .env file
```
GITHUB_CLIENT_ID=*****************
GITHUB_CLIENT_SECRET=**************
```
<hr>

### handy link:
https://learn.digitalcrafts.com/flex/lessons/databases/sequelize-orm/#sequelize-and-the-sequelize-cli


1. Build your team, 3 members max.

I am new after ~!!!

2.  Prepare a simple description that describes your application. It should answer the following questions

- Description: This is an online photo database that allows the user to upload pictures with customized metadata.

- What problem does is solve? (e.g. It makes it easier to prepare for the MCAT)
  We all take hundreds of photos and sometimes it is difficult to remember the event and who was with us. There will also be an - where text - description what the event was - time stamp
  (photo on left: data on the right)

- Who is for? (e.g. Students who are studying for the MCAT)
  It is for family, friends

- What does it do? (e.g. It reinforces concepts that students need to master in order to be successful)
  These may seem redundant and oversimplified but answering these questions will help you focus.
  organize photos with metadata(description, events, location)

* Please also do the following:

1. Give your app a name
   name: FotoFacts

2. Choose a name for your team: Picture Perfect

3. Determine who the team leader is
   Team members: Teila, Avery, Heggy

4. Start a repo at GitHub and share the link here in the chat

- Heggy's note on OAuth:

Facebook Setup for callback URL and ClientID, ClientSecret
1. https://developers.facebook.com/docs/facebook-login/web/
    A Facebook Developer Account
    A registered Facebook App with Basic Settings configured
    The Facebook JavaScript SDK


Problem:
Not showing up using the folders

<img src="https://media.tenor.com/images/60ca41c887fc2d1c204ba661677f26e3/tenor.gif" alt="magic shia">

<img src="https://cdn.glitch.com/cb093bfd-142f-45b3-bdb4-52ff49e0a1c2%2Fgrumpy.gif?v=1619841777278" alt="husky angry">

random img url:
https://placeimg.com/128/128/arch/sepia

https://placeimg.com/128/128/animals/grayscale

randome email: 
kim@co.com

name: Jo Mo

example code:
> npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string


> npx sequelize-cli model:generate --name User --attributes eventTitle:string,attendee1Name:string,attendee2Name:string,attendee3Name:string,eventSummary:string,insertLinktoPhoto:string

- form labels:
Event Title, Attendee 1,  Attendee 2, Attendee 3, Event Summary, Insert  link to Photo

- feature idea:
Attendee ID table and Photo table use join.