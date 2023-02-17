# Event Management System (Backend)

## Table of Contents

- [Introduction](#introduction)
- [Backend Endpoint Routes](#backend-endpoint-routes)
  
  - [User Routes](#user-routes)
  - [Event Routes](#event-routes)

- [Models](#models)

### Introduction

Backend for a basic event management system where user can create events and invite other registered users to the event.

### Backend Endpoint Routes

- #### User Routes

  - **Registering A User**

    - Endpoint: ```{{BASE_URL}}/api/v1/auth/regiter```
    - Request Type: ```POST```
    - Payload:

        ```js
        {
            "fullName": {{USER_FULL_NAME}},
            "email": {{USER_EMAIL}},
            "password": {{USER_PASSWORD}} 
        }
        ```

    - Response:

        ```js
        {
            status: 200,
            message: 'User Created Successfully!'
        }
        ```

  - **Login A User**

    - Endpoint: ```{{BASE_URL}}/api/v1/auth/login```
    - Request Type: ```POST```
    - Payload:

        ```js
        {
            "email": {{USER_EMAIL}},
            "password": {{USER_PASSWORD}}
        }
        ```

    - Response:

        ```js
        {
            jwtToken: {{GENERATED_JWT_TOKEN}}
        }
        ```
