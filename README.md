# JWT-Auth-Project
Familiarizing myself with auth using JWTs: 

On the backend:
1) First created the boilerplate express app
2) Then created "server/routes/jwtAuth.js". This has route logic for registration and log-in of users, each of which returns a JWT to the user which they can use to be authenticated and authorized. 
3) Once the user has the JWT, if they are authorized, they can access the dashboard route. This required the authorized middleware in the middlewares folder. Middleware is a function that is excecuted in between a req and res, and it has access to the req and res objects. If middleware is executed without termination, u can call the 'next()' function to go on to the next function to be executed. 
