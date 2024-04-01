# Travel Buddy Matching

- A project related to travel management where users can register and request for tours.

### server side

[Live link](https://travel-buddies-seven.vercel.app)

### Features

- User registration
- Token based user login
- User profile updation
- Trip creation
- Trips fetching with filtering and pagination
- Request for trips
- View all request for a specific trip
- Responding user request for trips

### Technologies

- Typescript
- Prisma with PostgreSQL
- Express
- JWT
- Others

### How to run the app locally

1. Download the project from github

2. If nodeJs is not installed then install it

3. Open the project with any code editor

4. Open a terminal in the project folder and run "npm install". The following command will install all the listed dependencies in the package.json file, needed for the application to run smoothly.

5. Now when the dependencies are installed, create a .env file and inside the file declare the following environment variables:

   - DATABASE_URL: PostgreSQL database url. Url can be from local machine or cloud. Eg. "postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
   - NODE_ENV: Eg. development
   - PORT: Host port. Eg. 5000
   - BCRYPT_SALT_ROUNDS : Salt rounds needed for bcrypt password hashing and verifying
   - JWT_ACCESS_SECRET : The secret string needed for creating jwt access token

6. Build the typescript code

   - npm run build: it will invoke the tsc command needed for building ts files

7. Now that the typescript code is done building, we can run the application

   - npm run dev : this command will run tsc-node-dev which will keep the app running and automatically restart on any change in the code. This is helpful while development.

   - npm run start : this will run the javascript server file with node.

   - node ./dist/server.js : if you want to directly use node to run the server file

8. Finally when the app in running on localhost, api calls can be made
