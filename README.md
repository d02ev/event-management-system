# Event Management System (Backend)

## Table of Contents

- [Introduction](#introduction)
- [Backend Endpoint Routes](#backend-endpoint-routes)
  
  - [User Routes](#user-routes)
  - [Admin Routes](#admin-routes)
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

- #### Admin Routes

  - **Accessing All Registered Users**

    - Endpoint: ```{{BASE_URL}}/api/v1/admin/dashboard```
    - Request Type: ```GET```
    - Response: ```Array Of All Registered Users```

  - **Granting Admin Privileges**

    - Endpoint: ```{{BASE_URL}}/api/v1/admin/grant/:{{USER_ID}}```
    - Request Type: ```PATCH```
    - Response:

        ```js
        {
            status: 200,
            message: 'User Has Been Granted Admin Privileges!'
        }
        ```

  - **Revoking User's Admin Privilges**

    - Endpoint: ```{{BASE_URL}}/api/v1/admin/revoke/{{USER_ID}}```
    - Request Type: ```PATCH```
    - Response:

        ```js
        {
            status: 200,
            message: "User's Admin Privileges Revoked!"
        }
        ```

- #### Event Routes

  - **Creating An Event**

    - Endpoint: ```{{BASE_URL}}/api/v1/event```
    - Request Type: ```POST```
    - Payload:

        ```js
        {
            "title": {{EVENT_TITLE}},
            "description": {{EVENT_DESCRIPTION}},
            "eventDate": {{EVENT_DATE}},
            "eventTime": {{EVENT_TIME}},
            "eventType:": {{EVENT_TYPE}},
            "emailInvites": {{COMMA_SEPARATED_USER_EMAILS}},
            "emailOrganiser": {{AUTOMATIC_ACCESS_THROUGH_JWT}}
        }
        ```

    - Response:

        ```js
        {
            status: 201,
            message: 'Event Created Successfully!'
        }
        ```

    - **NOTE**: ```Only Logged In Users Can Create Events.```

  - **Access All Events**

    - Endpoint: ```{{BASE_URL}}/api/v1/event```
    - Request Type: ```GET```
    - Response: ```Array Of All (Public/Private) Events.```
    - **NOTE**: ```Only Admins And Super Admins Can Access All Events.```

  - **Access All Public Events**

    - Endpoint: ```{{BASE_URL}}/api/v1/event/public```
    - Request Type: ```GET```
    - Response: ```Array Of All Public Events.```

  - **Access User Created Events**

    - Endpoint: ```{{BASE_URL}}/api/v1/event/dashboard```
    - Request Type: ```GET```
    - Response: ```Array Of All Events Created By The Logged In User.```
    - **NOTE**: ```Only Logged In Users Can Access Their Own Events.```

  - **Modify An Event**

    - Endpoint: ```{{BASE_URL}}/api/v1/event/edit/{{EVENT_ID}}```
    - Request Type: ```PATCH```
    - Payload:

        ```js
        {
            "title": {{MODIFIED_TITLE}} || {{ORIGINAL TITLE}}
            "description": {{MODIFIED_DESCRIPTION}} || {{ORIGINAL_DESCRIPTION}},
            "eventDate": {{MODIFIED_EVENT_DATE}} || {{ORIGINAL_EVENT_DATE}},
            "eventTime": {{MODIFIED_EVENT_TIME}} || {{ORIGINAL_EVENT_TIME}},
            "eventType": {{MODIFIED_EVENT_TYPE}} || {{ORIGINAL_EVENT_TYPE}},
            "emailInvites": {{MODIFIED_EMAIL_INVITES}} || {{ORIGINAL_EVENT_INVITES}}
        }
        ```

    - Response:

        ```js
        {
            status: 200,
            message: 'Event Modified Successfully!'
        }
        ```

    - **NOTE**:

        ```j
        1. Only Logged In Users Can Modify Events.
        2. Users Can Only Modify Their Own Events.
        ```

  - **Delete An Event**

    - Endpoint: ```{{BASE_URL}}/api/v1/event/delete/{{EVENT_ID}}```
    - Request Type: ```DELETE```
    - Response:

        ```js
        {
            status: 200,
            message: 'Event Deleted Successfully'
        }
        ```

    - **NOTE**:

        ```j
        1. Only Logged In Users Can Delete Events.
        2. Users Can Only Delete Their Own Events.
        ```
