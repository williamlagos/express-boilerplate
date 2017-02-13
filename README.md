**Rental Movie Service Node REST API**
----

Node REST API developed in JavaScript with Express.js, Passport, Epilogue and Sequelize tools

* **Instructions**
  ```bash
  $ npm start (Runs in 127.0.0.1:3000 address)
  ```

* **Method:**

  /users/

  `GET` | `POST` | `DELETE` | `PUT`

*  **URL Params**

   Users and movies have all CRUD operations fully functional

   **Required:**

   `username=[string]`
   `password[string hash]`

* **Data Params**

  HTTP Basic Authorization Headers (username and password hash) applies here

* **Success Response:**

  When authorized, it shows the the given data about the movie and/or user

  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`

* **Login Call:**

  ```bash
  $ curl -v --user jack:secret http://127.0.0.1:3000/me
  ```

* **Notes:**

  Made by William Oliveira de Lagos in February 2017 and open sourced.
