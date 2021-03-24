# SQL Injection Attack

This will be a repository for a SQL Injection attack demo

Instructions for getting this set up on your machine:

- Pre-requisties
  - [NodeJS](https://nodejs.org/en/download/)
  - [yarn](https://classic.yarnpkg.com/en/docs/install/)
  - [docker](https://docs.docker.com/engine/install/)
  - [docker-compose](https://docs.docker.com/compose/install/)
- Clone this repository
- Run `docker-compose up` from your console in this directory, to start mysql service
- Run `yarn install` from your console in this directory
- Run `yarn dev` to start the server
- Visit `localhost:3000` to access the server

## This will require a SQL database set up with the following information:

- host: "localhost"
- port: 3306
- user: "root"
- password: "ExamplePassword"
- database: 'mysql'
- Tables: 'pariticipant', 'passkey' and 'product'

## Database Table Schemas

### `product` table

- idproduct INT Primary Key Not Null
- name VARCHAR(45)
- price DOUBLE
- quantity INT

### `participant` table

- idparticipant INT Primary Key Not Null
- firstname VARCHAR(45)
- lastname VARCHAR(45)
- username VARCHAR(45)
- ccnum VARCHAR(45)
- address VARCHAR(45)
- age INT

### `passkey` table

- idpasskey INT Primary Key Not Null
- value VARCHAR(45)
- idparticipant INT
