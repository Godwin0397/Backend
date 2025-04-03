# FSD Project

## About

This repository contains the code for backend application for the frontend repository

Backend Application is the RESTFUL API deeloped using Node.js and Express.js. It uses MongoDB as the database and Mongoose as the ODM(Object Data Modeling). 

### Environment Needed
- VS Code IDE: To Wtite Code
- Node JS: To Create Server
- Express JS: To Create Rest API
- GIT
- Nodemon: Auto Restart Server
- Postman: Testing API
- Mongo DB: Database

## Setting Up Backend
- Packages Needed
    - Mongoose
    - MongoDB Compass

- API Development
    - Create User
    - Get User
    - Get User By ID
    - Update User
    - Delete User
    - Login User
    - Logout User

## Setting Up Frontend
- React.js: To Create UI
- Vite: To Create a React Project
- React Router DOM: To navigate between components
- Axios: To make Https request
- Bootstrap: To design the UI
- React Icons/Fontawesome: To use Icons
- React Toastify: To show Toast Messages(Alerts)
- React Hooks: To manage the state

## Deployment
- Integration of frontend and backend
- Backend deployment: Render
- Front deployment: Netlify

## Setup
- Run `npm init` to create a package.json file.
- Run `npm install` to install the dependencies.

## Application

Job Portal Application

### Features

-[x] User Registration
-[x] User Login

-[x] Admin Dashboard
    -[x] Add a company
    -[x] Update a company
    -[x] Delete a company
    -[x] Get all companies
    -[x] Get company by ID
    -[x] Add a job
    -[x] Update a job
    -[x] Delete a job
    -[x] Get all job
    -[x] Get job by ID

-[] User Dashboard
    -[x] View all jobs
    -[x] View jobs by Id
    -[x] Apply for a job
    -[x] View applied jobs
    
-[x] User Profile
    -[x] Get user profile
    -[x] Update user profile
    -[x] Delete user profile

-[x] Logout


## API Endpoints

### Users

- `POST/api/users` - Create all users
- `POST/api/users/login` - Login user
- `POST/api/users/logout` - Logout user
- `GET/api/users/:me` - Get current user
- `PUT/api/users/:me` - Update current user
- `DELETE/api/users/:me` - Delete current user

### Admin
- `GET/api/users` - Get all users
- `GET/api/users/:id` - Get user by id
- `PUT/api/users/:id` - Update user by id
- `DELETE/api/users/:id` - Delete user by id






