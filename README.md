# JWT-Auth-Project
Familiarizing myself with auth using JWTs: 

On the backend:
- Created boilerplate express app, then created routes folder for 2 kinds of routes: auth and dashboard. Auth routes contain logic for registration and login of user. When these endpoints are hit, the client receives a JWT which can be used to authorize their way into the dashboard. Dashboard only has 1 route and that's to display the username of the person. 
- Created authorization middleware, and valid email checking middleware. 

On the frontend: 
- Consists of 3 main pages: login, registration and dashboard which can travel to each other using react-router-dom. 
- Once user logs in/registers they get a JWT. This JWT means they are authenticated, and can view the dashboard. The dashboard simply consists of a blank page with their unique username. Then users can log out from the dashboard. 
- Users are given notifications via the react-toastify library. 
