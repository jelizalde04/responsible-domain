# Delete Avatar Microservice

## 1. Overview

The **Delete Avatar Microservice** is responsible for deleting a responsible user's avatar image from the system. This includes removing the avatar from cloud storage (such as AWS S3) and updating the user's profile to reflect the deletion. The microservice ensures that only authenticated users can delete their own avatars and may notify other microservices about the change if necessary.

## 2. Routes and Endpoints

### Base URL

```
/avatars
```

### Endpoints

#### **DELETE /avatars**

Deletes the authenticated user's avatar from storage and updates their profile.

- **Request Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

- **Success Response (200):**
  ```json
  {
    "message": "Avatar deleted successfully."
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
    "error": "Avatar not found."
  }
  ```

- **Example cURL:**
  ```sh
  curl -X DELETE http://localhost:2004/avatars \
    -H "Authorization: Bearer <JWT_TOKEN>"
  ```

#### **Swagger Documentation**

- **GET /api-docs-deleteAvatar**  
  Interactive API documentation and testing interface.

  Access at: [http://localhost:2004/api-docs-deleteAvatar](http://localhost:2004/api-docs-deleteAvatar)

## 3. How the Microservice Works

- **Controllers:**  
  The controller receives the DELETE request, validates the JWT token, and calls the service layer to handle the avatar deletion.

- **Services:**  
  The service interacts with cloud storage (e.g., AWS S3) to delete the avatar file and updates the user's profile in the database to remove the avatar URL.

- **Database:**  
  Uses an ORM (such as Sequelize) to update the responsible user's record and remove the avatar reference.

- **Cloud Storage:**  
  Integrates with AWS S3 (or similar) to physically delete the avatar image.

- **Authentication:**  
  The JWT token is required and validated for every delete request. Only the authenticated user can delete their own avatar.

- **Error Handling:**  
  Returns appropriate error messages for unauthorized access or if the avatar does not exist.

**Internal Workflow:**
1. Receives a DELETE request with a JWT token.
2. Validates the token and extracts the user ID.
3. Checks if the user has an avatar.
4. Deletes the avatar from cloud storage.
5. Updates the user's profile in the database.
6. Returns a success or error response.

## 4. Technologies and Tools Used

- **Language:** Node.js
- **Framework:** Express.js
- **ORM:** Sequelize (or similar)
- **Database:** PostgreSQL
- **Cloud Storage:** AWS S3 (or compatible)
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
  Ensures only authenticated users can delete their own avatar.

## 6. Setup and Running

### Prerequisites

- Node.js (v14+)
- PostgreSQL database
- AWS S3 bucket (or compatible storage)

### Installation

```sh
git clone <repo-url>
cd responsible-profile-domain/delete-avatar
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
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_s3_bucket_name
```

### Running the Service

```sh
npm start
```

- Default port: **2004**

## 7. Swagger Documentation

- Access interactive API docs at:  
  [http://localhost:2004/api-docs-deleteAvatar](http://localhost:2004/api-docs-deleteAvatar)

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