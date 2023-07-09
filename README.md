# User Database

Allows interaction with a MongoDB database and collection of users.
Includes the integration with a telegram-bot, which gathers the information about a new contact (user) and adds the new user to the database.

Locally the server will be available at http://localhost:3000/.

## Full Documentation

The project includes a swagger-doc with a full documentation of all the endpoints. It can be accessed at the ``/api-docs`` endpoint, i.e: http://localhost:3000/api-docs/.

## Telegram bot

The bot can be accessed via the following link: 
https://t.me/supermacchan_contact_bot

##### * Make sure to launch the server and the bot beforehand.

## Commands

- ``npm install`` — installs necessary packages and dependencies
- ``npm start`` — start the server in production mode
- ``npm run start:dev`` — start the server in development mode
- ``npm run bot`` — launches the Telegram-bot
- ``npm test`` — runs tests for the main logic
- ``npm build`` — the command for deploying the backend on an external hosting

---------------
### Note:

#### Created as a [test task](https://docs.google.com/document/d/1kQZJ5MKh3zDWejVtCZ4A6p8BqwTXUu0VHiQnZWOv6HE/edit).


