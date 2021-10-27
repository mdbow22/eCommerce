# eCommerce Backend

## Description

A small backend utilizing MySQL, Sequelize, and Express to create an API for an ecommerce database.

## Installation

After forking the repo, run:

    npm install

This will install all dependencies.

You will then need to create a .env file with the following format:

    DB_USER='USERNAME'
    DB_PW='PASSWORD'
    DB_NAME='ecommerce_db'

Once complete, run the schema file either in MySQL workbench or through the commandline. If you need test data, run the seed file by calling:

    node seeds/index.js

## Usage

This app is simply a backend. You will need to add a frontend if you would like users to interact with it, or run from an API app such as Insomnia.

Functionality is built for adding, updating, and deleting Products, Product Categories, and Product Tags. See the walkthrough video for a look at these in action.

## Questions

Any questions should be directed through the issues section of the repo or directly to my github: https://github.com/mdbow22.

## Demo

Click the link for a walkthrough video of the routing: https://drive.google.com/file/d/1WeD1_7WNmz0snwt74tVhD3vCFczvvMUx/view