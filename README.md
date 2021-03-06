# MeetApp

Study project developed inside the Rocketseat's Bootcamp 8.0

**Technologies: React, React-Native, NodeJS, Redux, Styled-Components**

## A fullstack application powered by Nodejs, React and React Native.

This project allows it's users to find a meetup which they like and sign up to it, 
while also allowing the owners to create and manage their meetups within the web app.

To achieve this, the project includes a Mobile App, a Web App and an API.

## The Mobile App

The mobile app is built with React Native.

It includes 5 screens, using 2 different navigator types. 

The dashboard has an infinite scrolling list of meetups, allowing users to pick and choose the ones they like.

The application's state is managed through Redux, using sagas and redux-persist (for saving state in case the user closes the app).

The app is also connected to Reactotron in development for better debugging.

## The Web App

The web app is the admin panel for meetup owners.

Powered by React, it includes 7 screens. 

The dashboard aims for allowing the users to read the information they need quickly, so the UI is simple and efficient.

The application's state is also managed through Redux, using sagas and redux-persist (for saving state in case the user closes the site).

## The Backend

The API includes the main proccess which deals with *auth, providers, appointments, notifications 
and files* (for profile pictures); and a Queue proccess to execute side jobs, which are 
sending emails when determined events occur.

The main reason for using a separate proccess is to **avoid creating a slow experience to 
users** while sending emails, which are more timely operations.

To store all this data the API connects to a Postgres database through Sequelize, and 
also stores the jobs onto a Redis database.

# How to run

## Setup environment

You will need 2 databases running:
- **Postgres**;
- **Redis**.

***If you have docker*** you can run the following commands to set them up:
- Postgres: `docker run --name databaseName -e POSTGRES_PASSWORD=databasePassword -p 5432:5432 -d postgres`
- Redis: `docker run --name redisDBname -p 6379:6379 -d -t redis:alpine`

## Now lets install the application:

1. Clone the repository to a folder on your machine </br>
`git clone https://github.com/dantxal/meetapp.git meetapp`

2. Navigate to the *backend* directory</br>
`cd meetapp && cd backend`

3. Install dependencies using:</br>
`yarn` or `yarn install`

4. Setup environment variables:</br>
Copy the **.env.example** file, rename it to **.env** and set the environment variables as needed.
- The mailing system was tested using mailtrap.io, it's recommended that you use it too.

5.  Create database and run migrations:</br>
`yarn sequelize db:create` then `yarn sequelize db:migrate`

6. Start server in development mode</br>
`yarn dev`

7. If you are using the mailing system you have to run the queue that processess the mailing job: </br>
`yarn queue`


## The backend is ready!! On to the frontend:

1. Let's navigate to the frontend folder: </br>
`cd .. && cd frontend`

2. Install dependencies using:</br>
`yarn` or `yarn install`

3. Run the application using:</br>
`yarn start`

*The frontend sends requests to http://localhost:3333.</br>
If you changed the api port you need to change the baseUrl config under services/api.js*

*You may use the Reactotron app to see the flow of the application, the redux store and the sagas.*

*I recommend that you create a user, log in, and create some meetups so you can see the app working and get some mock data to see in the mobile application.*

## The frontend is set! Let's build the mobile application:

### This mobile application was tested only on android.

1. Make sure your emulator is running.

2. Let's navigate to the mobile app folder: </br>
`cd .. && cd mobile`

3. Install dependencies using:</br>
`yarn` or `yarn install`

4. If you run it using other than the Android Studio emulator, *some configuration will be necessary for reactotron and correct banner urls:*</br>
   1. Change the 'HOST' constant value under 'src/util/hostConstant.js', you can simply comment the active line and uncomment the one that corresponds to your environment.</br>
    ```js
      export const
      HOST= '10.0.2.2'; // Android Studio emulator (default)
      // HOST= '10.0.3.2'; // Genymotion emulator change to this
      // HOST= '192.168.0.80'; // Device via usb change to your machine's ip
    ```

5. Run the bundle server:</br>
   `yarn start`
6. Then install the application on your emulator:</br>
   `react-native run-android`</br>
    *When running this command, you may be prompted with an **error** about 'linking dependencies', don't worry, we have to manually link the dependency 'react-native-vector-icons' while the lib doesn't support the React Native autolinking.*

