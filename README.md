# More-Recipes

----
[![Build Status](https://travis-ci.org/Dheavyman/More-Recipes.svg?branch=develop)](https://travis-ci.org/Dheavyman/More-Recipes)
[![Maintainability](https://api.codeclimate.com/v1/badges/40b3e87a10c58d6018a4/maintainability)](https://codeclimate.com/github/Dheavyman/More-Recipes/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/Dheavyman/More-Recipes/badge.svg?branch=develop)](https://coveralls.io/github/Dheavyman/More-Recipes?branch=develop)

More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.

## Getting Started

This is a web application that allows allows a client to share recipe ideas and view other recipe ideas from other registered users. You will have to sign up before you can access the services provided by the application.

### Prerequsites

* Install NodeJs and Postgresql locally
* The app returns data in JSON format and require a client device that can parse JSON.

## API Endpoints

### Allows user to signup and signin

* **Signup:**
  POST: /api/users/signup

* **Signin:** This allows a user to login
  POST: /api/users/signin

### Allows logged in user to add a recipe

* POST: /api/recipes

### Allows logged in user to modify recipe he/she added

* PUT: /api/recipes/:recipeId

### Allows logged in user to delete a recipe he/she added

* DELETE: /api/recipes/:recipeId

### Allows logged in user to get all the recipes in the application

* GET: /api/recipes

### Allows logged in user to get a single recipe in the application

* GET: /api/recipes/:recipeId

### Allows logged in user to post a review for a recipe

* POST: /api/recipes/:recipeId/reviews

### Allows a user to get all his/her favorite recipes

* GET: /api/users/:userId/recipes

### Allows logged in user to get just the recipes with the most upvotes

* GET: /api/recipes?sort=upvotes&order=descending

## Built with

Materialize  
Node.js  
Express  
Postgresql RDMS  
Sequelize ORM

## Authors

Justin Nebo
