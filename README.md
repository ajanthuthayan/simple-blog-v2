# Simple Blog<sup>v2</sup>
[Live Demo](https://simple-blog-v2.vercel.app/)

## The Motivation
The motivation for this project came from my experience when uploading the [first Simple Blog project](https://github.com/uajanth/simple-blog-v1) to my Github profile.  While I was able to successfully upload the files, I was unable to get that application to function as it did locally after deploying it to [netlify](https://simpleblogv1.netlify.app/). While troubleshooting for solutions, I hit a point where I was contemplating whether I even wanted to post that on my portfolio given that I had already transitioned towards making full-stack applications using NodeJS since completing that project, and was no longer proud of this server-less blog that didn't have a database. So instead of trying to get that application working, I have decided to revisit the project and make a project that I will be proud of by creating a full-stack version.

Planned feature improvements
-	**Supports CRUD (create-read-update-delete) operations entirely**, and not limited to just create and read operations which were the only operations supported in the previous version
-	**Improve user authentication and form validation**, as previously Firebase Authentication, Redux and localStorage were used to authenticate users

Technologies and Practices I wanted to implement
- **NextJS**
  -  Last time I used NextJS mainly because it came preinstalled with dependencies that support Single Page Application (SPA) features such as page routing. This time I wanted to still use NextJS, but mainly because it allows developers to create fullstack applications with a ReactJS based front-end and NodeJS based backend, which are two JavaScript libraries that I have experience with.
- **MongoDB**
  - A database to support CRUD operations. In the last version, I used Firebase's Realtime Database API as a "database" for the blog posts. After using PostgreSQL in the SmartBrain App, I realized the speed advantage of using databases to query through data.  Additionally, databases were specifically designed to support CRUD operations, so I wouldn't have to create my own methods to create-read-update-delete data using JavaScript and the Firebase Realtime Database. Given that I had experience with relational (SQL) databases, I wanted to challenge myself by gaining experience with non-relational (NoSQL) databases. MongoDB is a popular NoSQL database with strong documentation, so I decided to use that for my project, more specifically using their cloud service MongoDB Atlas.


and Firebase Authentication along with Redux and localStorage to authentication users


## Project Description


## How to use the project
