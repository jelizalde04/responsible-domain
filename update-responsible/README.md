# Update Responsible Microservice

## 1. Overview

The **Update Responsible Microservice** is designed to allow authenticated users to update their profile information in the pet management system. This includes updating fields such as name, email, password, contact information, and avatar URL. The microservice ensures data integrity, validates input, and prevents duplicate emails. It interacts with other microservices by maintaining up-to-date user data that can be referenced for authentication, profile management, and avatar handling.

## 2. Routes and Endpoints

### Base URL

```
/responsibles
```

### Endpoints

#### **PUT /responsibles**

Updates the authenticated responsible user's information.

- **Request Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

- **Request Body (JSON):**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "newPassword123",
    "contact": "9876543210",
    "avatar": "https://bucket.s3.amazonaws.com/avatars/jane_avatar.jpg"
  }
  ```

- **Success Response (200):**
  ```json
  {
    "message": "Responsable actualizado exitosamente.",
    "responsible": {
      "id": "uuid",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "contact": "9876543210",
      "avatar": "https://bucket.s3.amazonaws.com/avatars/jane_avatar.jpg"
    }
  }
  ```

- **Error Response (400):**
  ```json
  {
    "error": "Datos de entrada inválidos",
    "details": [
      {
        "msg": "El formato del email no es válido",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

- **Error Response (404):**
  ```json
  {
    "error": "Responsable no encontrado."
  }
  ```

- **Example cURL:**
  ```sh
  curl -X PUT http://localhost:2002/responsibles \
    -H "Authorization: Bearer <JWT_TOKEN>" \
    -H "Content-Type: application/json" \
    -d '{"name":"Jane Doe","email":"jane@example.com","password":"newPassword123","contact":"9876543210"}'
  ```

#### **Swagger Documentation**

- **GET /api-docs-updateRes**  
  Interactive API documentation and testing interface.

  Access at: [http://localhost:2002/api-docs-updateRes](http://localhost:2002/api-docs-updateRes)

## 3. How the Microservice Works

- **Controllers:**  
  The [`ResponsibleController`](controllers/ResponsibleController.js) handles incoming requests, validates input using `express-validator`, and delegates business logic to the service layer.

- **Services:**  
  The [`ResponsibleService`](services/ResponsibleService.js) manages database operations, including checking for duplicate emails and updating user records.

- **Database:**  
  Uses Sequelize ORM to interact with a PostgreSQL database. User data is stored in the `Responsibles` table.

- **Validation:**  
  Input is validated using the [`validateResponsible`](middlewares/validateResponsible.js) middleware.

- **Error Handling:**  
  Consistent error responses are returned for validation errors, not found errors, and server errors.

- **Avatar Handling:**  
  Accepts an optional avatar URL during update. Image upload is handled by other microservices; this service only stores the URL.

- **Authentication:**  
  All update operations require a valid JWT token. The token is decoded to identify the authenticated user.

**Internal Workflow:**
1. Receives a PUT request with user data and JWT token.
2. Validates the input fields.
3. Checks for duplicate email in the database (if email is being updated).
4. If valid, updates the user record.
5. Returns a success response with the updated user data.

## 4. Technologies and Tools Used

- **Language:** Node.js
- **Framework:** Express.js
- **ORM:** Sequelize
- **Database:** PostgreSQL
- **Validation:** express-validator
- **API Documentation:** Swagger (swagger-jsdoc, swagger-ui-express)
- **Environment Management:** dotenv
- **UUID Generation:** uuid
- **Authentication:** jsonwebtoken

## 5. Authentication and Security

- **JWT Authentication:**  
  All update endpoints require a valid JWT token in the `Authorization` header.

- **CORS:**  
  Enabled via the `cors` package to allow cross-origin requests.

- **Input Validation:**  
  All input is validated to prevent invalid or malicious data.

## 6. Setup and Running

### Prerequisites

- Node.js (v14+)
- PostgreSQL database

### Installation

```sh
git clone <repo-url>
cd responsible-profile-domain/update-responsible
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

- Default port: **2002**

## 7. Swagger Documentation

- Access interactive API docs at:  
  [http://localhost:2002/api-docs-updateRes](http://localhost:2002/api-docs-updateRes)

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