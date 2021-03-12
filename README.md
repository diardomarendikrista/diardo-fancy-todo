# fancy-todo

# Screenshots
1. Register Page
![Register Login](https://i.imgur.com/z3drDU9.png)
2. Main Page
![Main Page](https://i.imgur.com/2aAK7PB.png)

# DOCUMENTATION
## List Available Routes
  ### # Users
  - POST /register
  - POST /login
  ### # Google Login
  - POST /loginGoogle
  ### # Todos
  - POST /todos
  - GET /todos
  - GET /todos/:id
  - PUT /todos/:id
  - PATCH /todos/:id
  - DELETE /todos/:id
  ### # 3rd party API (quotes)
  - GET /quotes
<br/>  

## Users
- ### Register
  endpoint: `POST /register`

  #### _Request_
  * body
  ```js
  {
    "email": string,
    "password": string
  }
  ```
  #### _Response_
  * 201 Created
  ```js
  {
    "message": string
  }

  usually only display info "user created"
  ```  
  #### Fail Response :
    * 400 Bad Request  
  
  Fail response detail at bottom<br/><br/>

- ### Login
  endpoint: `POST /login`

  #### _Request_
  * body
  ```js
  {
    "email": string,
    "password": string
  }
  ```
  #### _Response_
  * 200 OK
  ```js
  {
    "token": string
  }
  ```  
  #### Fail Response :
    * 400 Bad Request   
  
  Fail response detail at bottom <br/><br/>

- ### Google Login
  endpoint: `POST /loginGoogle`

  #### _Request_
  * body
  ```js
  {
    "google_token": string
  }
  ```
  #### _Response_
  * 200 OK
  ```js
  {
    "token": string
  }
  ```  
  #### Fail Response :
    * 400 Bad Request   
  
  Fail response detail at bottom <br/><br/>
  <br/>

## Todos
- ### Create Todo  
  endpoint: `POST /todos`

  #### _Request_
  * headers
    ```js
    {
      "token": string
    }
    ```
  * body
    ```js
    {
      "title": string,
      "description": string,
      "due_date": date
    }
    ```
  #### _Response_
  * 201 Created
    ```js
    {
      "id": <given>
      "title": string,
      "description": string,
      "status": boolean,
      "due_date": date,
      "updatedAt": date,
      "createdAt": date,
      "user_id": <user id login>
    }
    ```
  #### Fail Response :
    * 400 Bad Request
    * 500 Internal Server Error  
  
  Fail response detail at bottom <br/><br/>

- ### List Todos
  endpoint: `GET /todos`

  #### _Request_
  * headers
    ```js
    {
      "token": string
    }
    ```
  #### _Response_
  * 200 OK
    ```js
    [
      {
        "id": <given>
        "title": string,
        "description": string,
        "status": boolean,
        "due_date": date,
        "updatedAt": date,
        "createdAt": date,
        "user_id": <user id login>
      },
      {
        "id": <given>,
        "title": string,
        "description": string,
        "status": boolean,
        "due_date": date,
        "updatedAt": date,
        "createdAt": date,
        "user_id": <user id login>
      }
    ]
    ```
  #### Fail Response :
    * 401 Unauthorized
    * 500 Internal Server Error  
  
  Fail response detail at bottom <br/><br/>

- ### Find Todo by ID  
  endpoint: `GET /todos/:id`

  #### _Request_
  * headers
    ```js
    {
      "token": string
    }
    ```
  * params
    ```js
    {
      "id": number
    }
    ```
  #### _Response_
  * 200 OK
    ```js
    {
      "id": <given>
      "title": string,
      "description": string,
      "status": boolean,
      "due_date": date,
      "updatedAt": date,
      "createdAt": date,
      "user_id": <user id login>
    }
    ```
  #### Fail Response :
    * 401 Unauthorized
    * 404 Not Found
  
  Fail response detail at bottom <br/><br/>

- ### Edit Todo
  endpoint: `PUT /todos/:id`

  #### _Request_
  * headers
    ```js
    {
      "token": string
    }
    ```
  * params
    ```js
    {
      "id": number
    }
    ```
  * body
    ```js
    {
      "title": string,
      "description": string,
      "status": boolean,
      "due_date": date
    }
    ```
  #### _Response_
  * 200 OK
    ```js
    {
      "id": <given>
      "title": string,
      "description": string,
      "status": boolean,
      "due_date": date,
      "updatedAt": date,
      "createdAt": date,
      "user_id": <user id login>
    }
    ```
  #### Fail Response :
    * 400 Bad Request
    * 401 Unauthorized
    * 404 Not Found
    * 500 Internal Server Error  
  
  Fail response detail at bottom <br/><br/>

- ### Update status Todo
  endpoint: `PATCH /todos/:id`

  #### _Request_
  * headers
    ```js
    {
      "token": string
    }
    ```
  * params
    ```js
    {
      "id": number
    }
    ```
  * body
    ```js
    {
      "status": boolean
    }
    ```
  #### _Response_
  * 200 OK
    ```js
    {
      "id": <given>
      "title": string,
      "description": string,
      "status": boolean,
      "due_date": date,
      "updatedAt": date,
      "createdAt": date,
      "user_id": <user id login>
    }
    ```
  #### Fail Response :
    * 400 Bad Request
    * 401 Unauthorized
    * 404 Not Found
    * 500 Internal Server Error  
  
  Fail response detail at bottom <br/><br/>

- ### Delete Todo
  endpoint: `DELETE /todos/:id`

  #### _Request_
  * headers
    ```js
    {
      "token": string
    }
    ```
  * params
    ```js
    {
      "id": number
    }
    ```
  #### _Response_
  * 200 OK
    ```js
    {
      "message": string
    }
    ```
  #### Fail Response :
    * 404 Not Found
    * 500 Internal Server Error  
  
  Fail response detail at bottom <br/><br/>
  <br/>
## 3rd Party API
- ### Quotes
  endpoint: `GET /quotes`

  #### _Request_
  * headers
    ```js
    {
      "token": string
    }
    ```
  #### _Response_
  * 200 OK
    ```js
    {
      "data": string
    }
    ```
  #### Fail Response :
    * 500 Internal Server Error  
  
  Fail response detail at bottom <br/><br/>

  ### All Fail Response  
  * 400 Bad Request

      ```js
      {
        "message": string,
        "errors": Array
      }
      ```
  * 401 Unauth­orized

      ```js
      {
        "message": string,
        "errors": Array
      }
      ```
  * 404 Not Found
    ```js
    {
      "message": string,
      "errors": Array
    }
    ```

  * 500 Internal Server Error
    ```js
    {
      "message": string,
      "errors": Array
    }
    ```