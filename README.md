# Simple Blog<sup>v2</sup>
[Live Demo](https://simple-blog-v2.vercel.app/)

For demo purposes, login with the following credentials:    

Email: `demo@demo.com`   
Password: `demo123`

## The Motivation
The motivation for this project came from my experience when uploading the [first Simple Blog project](https://github.com/uajanth/simple-blog-v1) to my Github profile.  While I was able to successfully upload the files, I was unable to get that application to function as it did locally after deploying it to [netlify](https://simpleblogv1.netlify.app/). While troubleshooting for solutions, I hit a point where I was contemplating whether I even wanted to post that on my portfolio given that I had already transitioned towards making full-stack applications using NodeJS since completing that project, and was no longer proud of this server-less blog that didn't have a database. So instead of trying to get that application working, I have decided to revisit the project and make a project that I will be proud of by creating a full-stack version.

### Planned feature improvements
-	**Supports CRUD (create-read-update-delete) operations entirely for blog posts**, and not limited to just create and read operations which were the only operations supported in the previous version
-	**Improve user authentication and form validation**, as previously Firebase Authentication, Redux and localStorage were used to authenticate users

## Implementation Technologies
These are some of the technologies that I set out to use, along with my reason for wanting to use them.
- **NextJS**
  -  Last time, I used NextJS mainly because it came preinstalled with dependencies that support Single Page Application (SPA) features such as page routing. This time I wanted to still use NextJS, but mainly because it allows developers to create fullstack applications with a ReactJS based front-end and NodeJS based backend, which are two JavaScript libraries that I have experience with.
- **MongoDB**
  - In the last version, I used Firebase's Realtime Database API as a "database" for the blog posts. After using PostgreSQL in the SmartBrain App, I realized the speed advantage of using databases to query through data.  Additionally, databases were specifically designed to support CRUD operations, so I wouldn't have to create my own methods to create-read-update-delete data using JavaScript and the Firebase Realtime Database. Given that I had experience with relational (SQL) databases, I wanted to challenge myself by gaining experience with non-relational (NoSQL) databases. MongoDB is a popular NoSQL database with strong documentation, so I decided to use that for my project, more specifically using their cloud service MongoDB Atlas.
- **Next Auth**
  -  Previously, I used Firebase Authenication along with the Firebase Realtime Database API, Redux and localStorage to authenticate users. At the time it didn't matter to me because I was just trying to focus on creating an application that had a login form, and was able to handle authenticated users different from non-authenticated users. However, after learning more about web app security I knew I had to incorporate a more secure authentication method, that cannot be easily manipulated with through localStorage. I looked into ways to authenticate users and came across JSON Web Tokens (JWT) and found that Next Auth supports JWT for NextJS. I plan to use Next Auth for handling authentication and to store user information into the MongoDB database. 

  <sub><sup>Note, as a security measure, I will use bcrypt to hash user passwords and store that hash into the database rather than expose the password directly onto the database.</sup></sub>
  
- **Redux**  
  - Manage the app-wide state of `isLoggedIn` through Redux, similar to the previous version. Handles frequent changes better over alternatives such as React's Context API.

- **Chakra UI**
  - Last time, I created components from scratch to practice my CSS skills. While I definitely had fun, and learned a lot about styling and UI/UX design in the previous version, this time I wanted to use a UI component library to reduce the time it takes to style components. I decided to choose Chakra UI over the likes of Material UI (MUI) because it fit with the feel I wanted to achieve. Whereas, if I was to design an enterprise level application I would definitely opt for a library such as Material UI.
 
- **Vercel** 
  - Previously, I used Netlify to deploy the first version of the Simple Blog project. At the time it made sense, given that that application had no backend. However, after using a provider like Heroku to deploy a fullstack application, I didn't like the inconvenience of having to start up the backend by visiting the backend Heroku link before visiting the "front-end" link to make sure that the app would work. Additionally, Heroku was noticeably slower than Netlify and Vercel. Conveniently, Vercel was built by the developers of NextJS to support deployment of NextJS applications seamlessly, so I will deploy this project with Vercel.

## Project Description
This web application was selected as a personal challenge to show my growth from front-end to full-stack development. This is a simple CRUD application that allows authenticated users to be able to create, read, update and delete posts. Whereas, users who are not authenticated will be able to only read posts. The first Simple Blog project I completed was built using Next.JS and client-side fetching to Firebase’s Realtime Database API and Authentication module. I decided to revisit that project and build onto it by making it a full-stack application using a MongoDB database and NodeJS backend, along with improved user validation and authentication to provide a better user experience.

### Features
#### Completed
- [x] Supports CRUD (create-read-update-delete) operations entirely for blog posts
- [x] Improve user authentication and form validation

#### Upcoming
- [ ] Allow users to comment on blog posts to increase engagement
- [ ] Add a feature to vote for posts (i.e like button)


## How to use the project

Visit the live demo [here](https://simple-blog-v2.vercel.app/) to get started.

### Coming Soon...



