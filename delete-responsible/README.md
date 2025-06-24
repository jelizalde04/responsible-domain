# Delete Responsible Microservice

## 1. Overview

The **Delete Responsible Microservice** is responsible for securely deleting a responsible user's profile from the system. This includes removing the user's data from the database and ensuring that only authenticated users can perform this action. The microservice may interact with other services to maintain data consistency, such as notifying related microservices about the deletion event.

## 2. Routes and Endpoints

### Base URL

```
/responsibles
```

### Endpoints

#### **DELETE /responsibles**

Deletes the authenticated responsible user's profile.

- **Request Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

- **Success Response (200):**
  ```json
  {
    "message": "Responsible deleted successfully."
  }
  ```

- **Error Response (401):**
  ```json
  {
    "error": "Unauthorized. Invalid or missing token."
  }
  ```

- **Error Response (404):**
  ```json
  {
    "error": "Responsible not found."
  }
  ```

- **Example cURL:**
  ```sh
  curl -X DELETE http://localhost:2003/responsibles \
    -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### **Swagger Documentation**

- **GET /api-docs-deleteRes**  
  Interactive API documentation and testing interface.

  Access at: [http://localhost:2003/api-docs-deleteRes](http://localhost:2003/api-docs-deleteRes)

## 3. How the Microservice Works

- **Controllers:**  
  The controller receives the DELETE request, validates the JWT token, and calls the service layer to perform the deletion.

- **Services:**  
  The service interacts with the database using Sequelize ORM to find and delete the responsible user by their ID.

- **Database:**  
  Uses PostgreSQL to store responsible user data. The deletion is performed as a hard delete (removing the record).

- **Authentication:**  
  The JWT token is required and validated for every delete request. Only the authenticated user can delete their own profile.

- **Error Handling:**  
  Returns appropriate error messages for unauthorized access or if the user is not found.

**Internal Workflow:**
1. Receives a DELETE request with a JWT token.
2. Validates the token and extracts the user ID.
3. Checks if the responsible user exists in the database.
4. Deletes the user if found.
5. Returns a success or error response.

## 4. Technologies and Tools Used

- **Language:** Node.js
- **Framework:** Express.js
- **ORM:** Sequelize
- **Database:** PostgreSQL
- **Authentication:** jsonwebtoken
- **Environment Management:** dotenv
- **API Documentation:** Swagger (swagger-jsdoc, swagger-ui-express)
- **CORS:** cors

## 5. Authentication and Security

- **JWT Authentication:**  
  All delete operations require a valid JWT token in the `Authorization` header.

- **CORS:**  
  Enabled via the `cors` package to allow cross-origin requests.

- **Input Validation:**  
  Ensures only authenticated users can delete their own profile.

## 6. Setup and Running

### Prerequisites

- Node.js (v14+)
- PostgreSQL database

### Installation

```sh
git clone <repo-url>
cd responsible-profile-domain/delete-responsible
npm install
```

### Environment Variables

Create a `.env` file with the following variables:

```
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
JWT_SECRET=your_jwt_secret
```

### Running the Service

```sh
npm start
```

- Default port: **2003**

## 7. Swagger Documentation

- Access interactive API docs at:  
  [http://localhost:2003/api-docs-deleteRes](http://localhost:2003/api-docs-deleteRes)

## 8. Testing

- Automated tests can be added in the `test/` directory.
- Run tests with:

```sh
npm test
```

## 9. Contributing

1. Fork the repository and create a new branch.
2. Make your changes and add tests if necessary.
3. Run tests locally to ensure nothing is broken.
4. Submit a pull request with a clear description of your changes.

## 10. License

This microservice is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.