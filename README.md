# WebCamp
![](https://github.com/raymerorale/stark-fortress-73557/blob/master/public/screenshots/1.png) </br></br></br></br>
![](https://github.com/raymerorale/stark-fortress-73557/blob/master/public/screenshots/3.png) </br></br></br></br>
![](https://github.com/raymerorale/stark-fortress-73557/blob/master/public/screenshots/5.png) </br></br></br></br>
WebCamp is a campground reviewing website. Users can create their own campgrounds or review others' campgrounds. To get started, you must create an account.

## Features
* Users can create, edit, and remove campgrounds
* Users can review campgrounds once, and edit or remove their review
* User profiles include more information on the user (full name, email, phone, join date), their campgrounds, and the option to edit their profile or delete their account
* Search campground by name
* Sort campgrounds by highest rating, most reviewed, lowest price, or highest price

This was originally named YelpCamp and a project for a web development course taught by Colt Steele. YelpCamp was created using Node.js, Express, and MongoDB.


## Run it locally
1. Install [mongodb](https://www.mongodb.com/)
2. Create a cloudinary account to get an API key and secret code

```
git clone https://github.com/raymerorale/stark-fortress-73557.git
cd stark-fortress-73557
npm install
```

Create a .env file (or just export manually in the terminal) in the root of the project and add the following:  

```
DATABASEURL='<url>'
API_KEY=''<key>
API_SECRET='<secret>'
```

Run ```mongod``` in another terminal and ```node app.js``` in the terminal with the project.  

Then go to [localhost:3000](http://localhost:3000/).
