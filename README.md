# User Localization Visualization Tool

This project is to create a visual map of users which includes:
1) Web page where users can register with their information (username, name, password, US address).
2) Database that holds user data along with their lat/long geocode.
3) Frontend interface for users to login and edit their own information.
4) Map to display location of users.
5) Online User data which shows which users are online on the map.

## Demo Images
1. Interface to register users and save user data to mongoDB. 
![Register](https://github.com/athom031/UserRegLatLong/blob/master/demo_img/Register.png)
2. User Homepage where they can update their information.
![Login](https://github.com/athom031/UserRegLatLong/blob/master/demo_img/Login.png)
3. Client application that visualizes user location and activity. 
![Visualization](https://github.com/athom031/UserRegLatLong/blob/master/demo_img/Visualization.png)

## Getting Started

1) Be sure to install mongoose on your system.
* https://treehouse.github.io/installation-guides/mac/mongo-mac.html
2) Get a google api key.
* https://developers.google.com/maps/documentation/javascript/get-api-key
3) Make a Mongo DB and create a collection called 'users'.
* https://www.mongodb.com/products/compass

### Prerequisites

Run command located in package.json:
```
npm run setup
```
to install all of the required libraries

### Installing

1. Update API.js with your own [API key](https://github.com/athom031/UserRegLatLong/blob/master/API.js).
2. Update the [config file](https://github.com/athom031/UserRegLatLong/blob/master/server/config/config.json) in the server side on what is the link to the Mongo DB as the MONGO URI.
3. Run the command to install all of the required libraries: <br/>
```
npm run setup
```
4. Download [mongodb](https://docs.mongodb.com/v4.2/tutorial/install-mongodb-on-os-x/). The version downloaded matters for "npm run dev" command and should change this script accordingly in package.json.
5. This application runs on the following ports: <br/>
- PORT 3000 => backend <br/>
- PORT 3001 => user registration/login front end <br/>
- PORT 3002 => client user map front end <br/>
if you have things running on those ports run the command to kill those local ports:
```
npm run clear
```
6. Run the command to concurrently run the application (frontend and backend):
```
npm run dev
```

## Built With
These libraries are all installed in the package.json command:
```
npm run setup
```

### Server Side
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [passport](https://www.npmjs.com/package/passport) / [passport-local](https://www.npmjs.com/package/passport-local)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [lodash](https://www.npmjs.com/package/lodash)
* [node-fetch](https://www.npmjs.com/package/node-fetch)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [express](https://www.npmjs.com/package/express)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [cors](https://www.npmjs.com/package/cors)

### Client Side
* [react](https://www.npmjs.com/package/react)

### Visualization
* [google-maps-react](https://www.npmjs.com/package/google-maps-react)
* [customize-cra](https://www.npmjs.com/package/customize-cra)
* [react-app-rewired](https://www.npmjs.com/package/react-app-rewired)

### Total Application 
* [concurrently](https://www.npmjs.com/package/concurrently)



## Contributing

Please read [CONTRIBUTING.md](https://github.com/athom031/UserRegLatLong/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Alex Thomas** - [Github](https://github.com/athom031)


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/athom031/UserRegLatLong/blob/master/LICENSE.md) file for details

## Acknowledgments
How to deal with waiting on the promise call:
* https://stackoverflow.com/questions/48980380/returning-data-from-axios-api

How to send JSON object to server with a post:
* https://www.geeksforgeeks.org/how-to-send-a-json-object-to-a-server-using-javascript/

Form Controlled Component basics
* https://www.youtube.com/watch?v=7Vo_VCcWupQ

Styling Background Image 
* https://css-tricks.com/perfect-full-page-background-image/

React Login Registration Form
* https://www.youtube.com/watch?v=juUaJpMd2LE

Import outside of React src folder
* https://stackoverflow.com/questions/44114436/the-create-react-app-imports-restriction-outside-of-src-directory

Integrating Google Maps API into React
* https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications

Implementing Custom Google Map Api Style
* https://towardsdatascience.com/how-to-use-the-google-maps-api-with-custom-styling-in-react-js-f6e7e59273df


## Inspiration: 
Mean Stack User Registration
* https://www.youtube.com/watch?v=m34FCkBd7UU&t=1839s
