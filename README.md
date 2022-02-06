# reactnative-social-media-ts

# How to run the project:

1- Download the source code

2- Run `npm install` to install all the dependencies

3- Run `npm run android` for android or `npm run ios` for ios to run the app.

Note: As the server side project is hosted on Heroku(free version), if no web traffic in a 30-minute period, it will sleep it, so you first need to run a query on the below URL to run it again: 
https://rnserver.herokuapp.com

# Points to improve:

1- In the FeedContainer component for pagination the `Page` param is used to get the next page from server. While the app is running if a record added to the database in meantime, then the user fetch the next page, it will return one repetitive record along with data and cause this warning:
`Encountered two children with the same key `

To fix this, it is better to send the last received item id to the server and get the next records. In this case, you will never have duplicate items in your list. Unfortunately, Json Server library doesn't support this kind of pagination at the moment.


2- User Interface can be improved.
