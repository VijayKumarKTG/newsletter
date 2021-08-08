# Welcome to my newsletter!

You can create your own newsletter subscription-based on ReactJS and NodeJS.

Using this project, you can subscribe to a newsletter with your email and can view all of the subscription lists.

## Contents
  - [Contents](#contents)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [APIs](#apis)

## Prerequisites

The following tools will help you develop the project. Some are mandatory and some do not require but are useful.

* [NodeJS](https://nodejs.org/en/download/) and NPM (Required)
* [sqlite3](https://www.npmjs.com/package/sqlite3) and [sqlitebrowser](https://sqlitebrowser.org/) (Not required)

## Setup

Let's start with the setup.

1. First of all, clone this project. 
   > `git clone https://github.com/VijayKumarKTG/newsletter.git`

2. Move into the **newsletter** directory and install all the dependencies for the server.
   > `cd newsletter && npm install`

3. After that, you need to go another step into the **client** directory and install all the dependencies for the client.
   > `cd client && npm install`

4. You are done with installing the dependencies. Now, we need to build the client to use in the backend.
   > `npm run build`

5. And the final step is to start the server.
   > `cd .. && npm start`

## APIs

There are only 2 APIs endpoints in this project.

* `/api/subscribe` ( POST ) - Subscribe a user and return a id from the DB.
* `/api/subscriptions` ( GET ) - Retrieve all the subscribed emails list from DB in JSON format.
