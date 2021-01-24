# Git Commit App using GraphQl Github API

This application was created using the [Github GraphQl API](https://docs.github.com/en/graphql) \

## Apollo Client

The `Queries` used in this application, were performed using [Apollo Client](https://www.apollographql.com/docs/react/)

## Run the app in the development mode in your local environment

GitHub only allows requests at GraphQL API when it has a token for authentication
To do that through the application, you must first create a
new Personal access token [Here](https://github.com/settings/tokens)

Create a new file `.env` in the project directory

Copy the token and paste it in the `.env` as the environment variable :

### `REACT_APP_GITHUB_KEY = Token`

In the project directory, run:

### `npm install`

To install all dependencies

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

## You can visit the app demo deployed on netlify

[https://top-legal-test-abdelghafour-el-ghazi.netlify.app/](http://top-legal-test-abdelghafour-el-ghazi.netlify.app/)

## Things that can be improved

I will add the option of choosing the owner and the repository
and not only work with facebook/react
The `Github GraphQl API` doesn't have the data of the changed Files,
which is really needed.
Using the cursor to search in the GraphQl API can be improved, making the cursor optionnal,
use it if it is given, and fetch the first list if not.
Which can help with duplicate queries.
