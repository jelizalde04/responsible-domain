# Get All Responsibles Microservice

## 1. Overview

The **Get All Responsibles Microservice** provides an API endpoint to retrieve a list of all responsible users registered in the system. This microservice is essential for administrative tasks, reporting, or for other microservices that need to display or process the list of responsibles. It can interact with other microservices by serving as a source of user data for authentication, notifications, or profile management.

## 2. Routes and Endpoints

### Base URL

```
/responsibles
```

### Endpoints

#### **GET /responsibles**

Retrieves a list of all responsible users.

- **Request Headers:**  
  (Optional) `Authorization: Bearer <JWT_TOKEN>` if authentication is required.

- **Success Response (200):**
  ```json
  [
    {
      "id": "uuid-1",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "contact": "1234567890",
      "avatar": "https://bucket.s3.amazonaws.com/avatars/jane_avatar.jpg"
    },
    {
      "id": "uuid-2",
      "name": "John Smith",
      "email": "john@example.com",
      "contact": "0987654321",
      "avatar": "https://bucket.s3.amazonaws.com/avatars/john_avatar.jpg"
    }
  ]
  ```

- **Error Response (500):**
  ```json
  {
    "error": "Internal server error."
  }
  ```

- **Example cURL:**
  ```sh
  curl -X GET http://localhost:2005/responsibles
  ```

#### **Swagger Documentation**

- **GET /api-docs-getAllResponsibles**  
  Interactive API documentation and testing interface.

  Access at: [http://localhost:2005/api-docs-getAllResponsibles](http://localhost:2005/api-docs-getAllResponsibles)

## 3. How the Microservice Works

- **Controllers:**  
  The controller receives the GET request and calls the service layer to fetch all responsible users from the database.

- **Services:**  
  The service interacts with the database using an ORM (such as Sequelize) to retrieve all records from the responsibles table.

- **Database:**  
  Uses PostgreSQL to store responsible user data.

- **Authentication:**  
  The endpoint can be public or protected depending on requirements. If protected, JWT authentication is used.

- **Error Handling:**  
  Returns a 500 error if there is a problem retrieving the data.

**Internal Workflow:**
1. Receives a GET request.
2. (Optional) Validates JWT token if authentication is required.
3. Queries the database for all responsible users.
4. Returns the list of users or an error response.

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
  Not required for this endpoint as it only retrieves data.

## 6. Setup and Running

### Prerequisites

- Node.js (v14+)
- PostgreSQL database

### Installation

```sh
git clone <repo-url>
cd responsible-profile-domain/get-all-responsibles
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

- Default port: **2005**

## 7. Swagger Documentation

- Access interactive API docs at:  
  [http://localhost:2005/api-docs-getAllResponsibles](http://localhost:2005/api-docs-getAllResponsibles)

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