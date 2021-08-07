# Library-Managment-System
A simple LMS created with NodeJS , Mongodb , Ejs  

## Live Website
**[hajjaj-lms.herokuapp.com](https://hajjaj-lms.herokuapp.com/)**
## Technology used

- NodeJS , expressJS , Passport , EJS
- MongoDB (Mongoose)
- HTML5,JS,BOOTSTRAP5

## Features
- Login and Signup authentication with passport
- Email verification for signed up users using Twilio & SENDGRID API
- Server-Side form validations using JOI
- Subscription System using STRIPE API
- Different borrow restriction depending on the current subscription type
- Browse and search books by Title (Working on a more advanced search!)
- A fully working Borrow/Return system
- Alert messages for different actions
- A simple admin route where admin can accept pending subscription , Add ,Edit and Delete books.

### TODO LIST

1. Books sorting by name, author, etc.. 
2. Books filtering by category, ISBN
3. Advanced Book searching 
4. Add Tests
5. rewrite the entire app using ReactJS as a frontend 

## Installation

install nodeJs and run the following commands

```bash
npm install
npm run dev
```

