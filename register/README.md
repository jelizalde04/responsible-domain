# Register Microservice

## 1. Overview

The **Register Microservice** is responsible for registering new "responsible" users in the pet management system. It handles the creation of user accounts, including validation, storage in the database, and optional avatar URL assignment. This service interacts with other microservices by providing user data that can be referenced for authentication, profile management, and avatar handling.

## 2. Routes and Endpoints

### Base URL

```
/responsibles
```

### Endpoints

#### **POST /register**

Registers a new responsible user.

- **Request Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "contact": "1234567890",
    "avatar": "https://bucket.s3.amazonaws.com/avatars/john_avatar.jpg" // Optional
  }
  ```

- **Success Response (201):**
  ```json
  {
    "message": "Usuario creado exitosamente.",
    "responsible": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "contact": "1234567890",
      "avatar": "https://bucket.s3.amazonaws.com/avatars/john_avatar.jpg"
    }
  }
  ```

- **Error Response (400):**
  ```json
  {
    "error": "Datos de entrada inválidos",
    "details": [
      {
        "msg": "El nombre es obligatorio",
        "param": "name",
        "location": "body"
      }
    ]
  }
  ```

- **Example cURL:**
  ```sh
  curl -X POST http://localhost:2001/responsibles/register \
    -H "Content-Type: application/json" \
    -d '{"name":"John Doe","email":"john@example.com","password":"securePassword123","contact":"1234567890"}'
  ```

#### **Swagger Documentation**

- **GET /api-docs-register**  
  Interactive API documentation and testing interface.

## 3. How the Microservice Works

- **Controllers**: The `ResponsibleController` handles incoming requests, validates input, and delegates business logic to the service layer.
- **Services**: The `ResponsibleService` manages database operations, including checking for duplicate emails and creating new users.
- **Database**: Uses Sequelize ORM to interact with a PostgreSQL database. User data is stored in the `Responsibles` table.
- **Validation**: Input is validated using `express-validator` in the `validateResponsible` middleware.
- **Error Handling**: Centralized error handling middleware returns consistent error responses.
- **Avatar Handling**: Accepts an optional avatar URL during registration. Image upload is handled by other microservices.

**Internal Workflow:**
1. Receives a POST request with user data.
2. Validates the input fields.
3. Checks for duplicate email in the database.
4. If valid, creates a new user record.
5. Returns a success response with the created user data.

## 4. Technologies and Tools Used

- **Language**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize
- **Database**: PostgreSQL
- **Validation**: express-validator
- **API Documentation**: Swagger (swagger-jsdoc, swagger-ui-express)
- **Environment Management**: dotenv
- **UUID Generation**: uuid

## 5. Authentication and Security

- **CORS**: Enabled via the `cors` package to allow cross-origin requests.
- **Password Storage**: Passwords are stored as plain text (for demo purposes); in production, use hashing.
- **JWT**: Not required for registration, but other endpoints in the ecosystem use JWT for authentication.

## 6. Setup and Running

### Prerequisites

- Node.js (v14+)
- PostgreSQL database

### Installation

```sh
git clone <repo-url>
cd responsible-profile-domain/register
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
```

### Running the Service

```sh
npm start
```

- Default port: **2001**

## 7. Swagger Documentation

- Access interactive API docs at:  
  [http://localhost:2001/api-docs-register](http://localhost:2001/api-docs-register)

## 8. Testing

- Automated tests are located in `tests/funcionalityTest.test.js`.
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
