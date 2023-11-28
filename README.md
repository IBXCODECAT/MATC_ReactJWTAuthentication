# Node.js JWT Authentication & Authorization Project Documentation

## Overview
This Node.js express project demonstrates a bare-bones authentication API using Express and JWT tokens. The API allows users to register, log in, refresh their access token, and log out securely. Below is the documentation for the implemented routes.

## Understanding Token Authorization

In web applications, token authorization is a mechanism used to control access to resources or functionalities, ensuring that only authenticated and authorized users can perform specific actions. The two main types of tokens involved are access tokens and refresh tokens.

### Access Tokens

- An **access token** is a digital key issued to a user upon successful login.
- It is often a string of characters, encoded in a format like JSON Web Token (JWT).
- The access token serves as proof of user authentication.

### Refresh Tokens

- **Refresh tokens** allow users to obtain a new access token without logging in again.
- They act as longer-term credentials, used to refresh a user's session without exposing sensitive information.

### How It Works

#### User Authentication

1. The user enters credentials and sends them to the server.
2. Upon successful verification, the server generates an access token and a refresh token.
3. The access token is sent back to the user for subsequent requests.

#### Accessing Protected Resources

1. The user includes the access token in request headers when accessing protected resources.
2. The server checks the validity and expiration of the access token.
3. If valid, the user is granted access to the requested resource.

#### Token Expiration and Refresh

- Access tokens have a limited lifespan (e.g., 15 minutes) for security.
- If the access token expires, the user can use the refresh token to obtain a new access token without re-entering credentials.

A token authorization system verifies user identity and controls access to different parts of an application. It adds a layer of security by periodically refreshing access tokens and managing user sessions.

## Project Documentation
Feel free to use this project however you wish. You are permitted to fork or modify this code as well as use it commercially for your own purposes. Please see LICENSE.md in this directory for more details.

### API Routes

#### Home
This route serves as a basic endpoint to demonstrate token-based authorization. To access this route, an Authorization header must be provided with a valid access token.
```http
GET http://localhost:3000/
Authorization: Bearer <TOKEN HERE>
```

#### Login Route
This route handles user authentication by validating the provided email and password. Upon successful authentication, the server generates and returns an access token.
```http
POST http://localhost:3000/auth/login
Content-Type: application/json
{
    "email": "test@example.com",
    "password": "12345678"
}
```

#### Register Route
The register route allows users to create a new account by providing their email and password. The server securely stores the user's information and returns an access token upon successful registration.
```http
POST http://localhost:3000/auth/register
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "12345678"
}
```

#### Refresh Token Route
This route is used to refresh the access token by providing a valid refresh token. Refresh tokens provide a secure way to obtain a new access token without requiring the user to log in again.
```http
POST http://localhost:3000/auth/refresh-token
Content-Type: application/json
{
    "refreshToken": "<TOKEN HERE>"
}
```

#### Logout Route
The logout route allows users to invalidate their access and refresh tokens, enhancing security. It is implemented as a DELETE request.
```http
DELETE http://localhost:3000/auth/logout
```

### Token Expiration
Both access tokens and refresh tokens have expiration times to enhance security. Access tokens expire after a set duration, requiring users to log in again for a new access token. Refresh tokens also expire, ensuring that users periodically re-authenticate for security purposes.

## MongoDB
This project uses MongoDB to store user credentials and verify them during authorization. In order to connect to MongoDB you must create environment variables with your MongoDB connection string. __**`I WILL NOT HELP YOU WITH THIS!`**__ Please refer to the [MongoDB Node JS Driver Page](https://www.mongodb.com/docs/drivers/node/current/quick-start/connect-to-mongodb/) for instructions on how to get your connection string.
