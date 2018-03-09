# More-Recipes

----
[![Build Status](https://travis-ci.org/Dheavyman/More-Recipes.svg?branch=develop)](https://travis-ci.org/Dheavyman/More-Recipes)
[![Maintainability](https://api.codeclimate.com/v1/badges/40b3e87a10c58d6018a4/maintainability)](https://codeclimate.com/github/Dheavyman/More-Recipes/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/Dheavyman/More-Recipes/badge.svg?branch=develop)](https://coveralls.io/github/Dheavyman/More-Recipes?branch=develop)

More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.

## Table of Contents
- [Application Features](#application-features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Running the tests](#running-the-tests)
- [Built With](#built-with)
- [Contributing to the Project](#contributing-to-the-Project)
- [FAQ](#faq)
- [Application Limitations](#application-limitations)
- [License](#license)
- [Credits](#credits)


## Application features
* User can create an account
* User can login to access features that require authentication
* User can view recipes created and sectioned by:
  * Popular recipes based on favorites
  * Newest recipes created
  * All recipes in the application
  * Details of a particular recipe
* User can search for recipe based on recipe:
  * Title
  * Ingredients
  * Category
* User can receive notification when:
  * User recipe gets reviewed
  * User favorite recipe gets modified by the owner
* User can see the number of times his/her recipe has been viewed
* Authenticated user can create a recipe
* Authenticated user can edit a recipe he/she created
* Authenticated user can delete a recipe he/she created
* Authenticated user can review a recipe and delete his/her review
* Authenticated user can favorite a recipe and remove the recipe as favorite anytime
* Authenticated user can upvote or downvote a recipe
* Authenticated user can view and edit his/her profile details
* Authenticated user can opt in for notification and opt out anytime

### Prerequisites
* Install NodeJs and Postgresql locally
* The app returns data in JSON format and require a client device that can parse JSON.

## Getting Started
Follow the steps below to get the app running locally:
```
# Clone the repository
>$ git clone https://github.com/Dheavyman/More-Recipes.git

# Change directory into it
>$ cd More-Recipes

# Install all dependencies
> npm install

# Create a .env file and fill it with the sample provided in .env.sample file
> $ touch .env

# Start the application in development mode
> $ npm run migrate
> $ npm run start:dev
> $ npm run start:client

# Start the application in production mode
> $ npm run build:server
> $ npm run build:client
> $ npm run start

# Open running application on browser
> http:localhost:3000/
If you change the port in your .env file the use the port instead of the one above

```

## API Documentation
Access API documentation through this link [Here](https://more-recipes-25.herokuapp.com/api/v1/api-docs)

## Running the tests
* Create a test data base and add the configuration to the .env as specified in .env.sample file

* Run the test with the command  
`> $ npm run test`
## Built with

Materialize  
Node.js  
Express  
Postgresql RDMS  
Sequelize ORM

## Contributing to the Project
Contributions are welcome and appreciated. To contribute

- Fork this repository or clone the repository with the command  
`$ git clone https://github.com/Dheavyman/More-Recipes.git`
- Change directory into the folder with the command  
`cd more-recipes`
- Create your feature branch and make your contributions to your local copy of the project
- Raise a pull Request against the development branch describing what your feature does and how it can be tested

## FAQ
#### Is this an Open-Source Application?
    Yes it is, and contributing to the development of this
    application acceptable and by raising a pull request
    

#### Who can contribute?
    Anyone!. This application is open to all those who want to contribute to open-source development and are willing to follow the set standards for contributing.
    
#### Is there a set standard for pull requests to this repository?
    Yes, there are set conventions for pull requests to this repository and can be found in the project wiki.
    
#### What language was used to develop this application?
    This project is a full stack Javascript application
    
#### Can I clone this application for personal use?
    Yes!. This application is licensed under MIT. Further information can be found in the LICENSE file.

### What format is the API response in?
    The API response is in JSON format

## Application limitations
* The application runs on a single database and might impact the speed of response
* Users cannot register or login with there social accounts at the moment
## Licence
This project is available for use and modification under the MIT License. See the LICENSE file or click [here](https://github.com/Dheavyman/More-Recipes/blob/develop/LICENSE.md) for more details.

## Credits
Justin Nebo, Andela
