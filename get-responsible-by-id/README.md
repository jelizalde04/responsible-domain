# Get Responsible By ID Microservice

## 1. Overview

The **Get Responsible By ID Microservice** provides an API endpoint to retrieve the details of a specific responsible user by their unique identifier. This microservice is essential for user profile views, administrative tasks, or for other microservices that need to fetch detailed information about a responsible user. It can interact with other microservices by serving as a source of user data for authentication, notifications, or profile management.

## 2. Routes and Endpoints

### Base URL

```
/responsibles
```

### Endpoints

#### **GET /responsibles/:id**

Retrieves the details of a responsible user by their unique ID.

- **Request Parameters:**
  - `id` (string, required): The unique identifier of the responsible user.

- **Request Headers:**  
  (Optional) `Authorization: Bearer <JWT_TOKEN>` if authentication is required.

- **Success Response (200):**
  ```json
  {
    "id": "uuid-1",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "contact": "1234567890",
    "avatar": "https://bucket.s3.amazonaws.com/avatars/jane_avatar.jpg"
  }
  ```

- **Error Response (404):**
  ```json
  {
    "error": "Responsible not found."
  }
  ```

- **Error Response (500):**
  ```json
  {
    "error": "Internal server error."
  }
  ```

- **Example cURL:**
  ```sh
  curl -X GET http://localhost:2007/responsibles/uuid-1
  ```

#### **Swagger Documentation**

- **GET /api-docs-getResponsibleById**  
  Interactive API documentation and testing interface.

  Access at: [http://localhost:2007/api-docs-getResponsibleById](http://localhost:2007/api-docs-getResponsibleById)

## 3. How the Microservice Works

- **Controllers:**  
  The controller receives the GET request, extracts the user ID from the URL, and calls the service layer to fetch the responsible user's details from the database.

- **Services:**  
  The service interacts with the database using an ORM (such as Sequelize) to retrieve the user record by ID.

- **Database:**  
  Uses PostgreSQL to store responsible user data.

- **Authentication:**  
  The endpoint can be public or protected depending on requirements. If protected, JWT authentication is used.

- **Error Handling:**  
  Returns a 404 error if the user is not found, or a 500 error for server issues.

**Internal Workflow:**
1. Receives a GET request with a user ID parameter.
2. (Optional) Validates JWT token if authentication is required.
3. Queries the database for the responsible user by ID.
4. Returns the user details or an error response.

## 4. Technologies and Tools Used

- **Language:** Node.js
- **Framework:** Express.js
- **ORM:** Sequelize (or similar)
- **Database:** PostgreSQL
- **Authentication:** jsonwebtoken (if required)
- **Environment Management:** dotenv
- **API Documentation:** Swagger (swagger-jsdoc, swagger-ui-express)
- **CORS:** cors

## 5. Authentication and Security

- **JWT Authentication:**  
  If enabled, the endpoint requires a valid JWT token in the `Authorization` header.

- **CORS:**  
  Enabled via the `cors` package to allow cross-origin requests.

- **Input Validation:**  
  Validates that the `id` parameter is present and correctly formatted.

## 6. Setup and Running

### Prerequisites

- Node.js (v14+)
- PostgreSQL database

### Installation

```sh
git clone <repo-url>
cd responsible-profile-domain/get-responsible-by-id
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

- Default port: **2007**

## 7. Swagger Documentation

- Access interactive API docs at:  
  [http://localhost:2007/api-docs-getResponsibleById](http://localhost:2007/api-docs-getResponsibleById)

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

This microservice is licensed under the ISC License. See the [LICENSE](LICENSE) file