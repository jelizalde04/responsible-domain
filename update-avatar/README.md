# Update Avatar Microservice

## 1. Overview

The **Update Avatar Microservice** allows authenticated users to update their avatar image in the system. This involves uploading a new avatar image to cloud storage (such as AWS S3), updating the user's profile in the database with the new avatar URL, and ensuring that only the owner can perform this operation. The microservice may interact with other microservices to keep user data consistent across the platform.

## 2. Routes and Endpoints

### Base URL

```
/avatars
```

### Endpoints

#### **PUT /avatars**

Updates the authenticated user's avatar by uploading a new image and updating the profile.

- **Request Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: multipart/form-data`

- **Request Body:**
  - `avatar` (file): The new avatar image file.

- **Success Response (200):**
  ```json
  {
    "message": "Avatar updated successfully.",
    "avatarUrl": "https://bucket.s3.amazonaws.com/avatars/new_avatar.jpg"
  }
  ```

- **Error Response (400):**
  ```json
  {
    "error": "Invalid file format."
  }
  ```

- **Error Response (401):**
  ```json
  {
    "error": "Unauthorized. Invalid or missing token."
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
  curl -X PUT http://localhost:2008/avatars \
    -H "Authorization: Bearer <JWT_TOKEN>" \
    -F "avatar=@/path/to/new_avatar.jpg"
  ```

#### **Swagger Documentation**

- **GET /api-docs-updateAvatar**  
  Interactive API documentation and testing interface.

  Access at: [http://localhost:2008/api-docs-updateAvatar](http://localhost:2008/api-docs-updateAvatar)

## 3. How the Microservice Works

- **Controllers:**  
  The controller receives the PUT request, validates the JWT token, processes the uploaded file, and calls the service layer to handle the avatar update.

- **Services:**  
  The service uploads the new avatar image to AWS S3 (or compatible storage), updates the user's profile in the database with the new avatar URL, and removes the previous avatar if necessary.

- **Database:**  
  Uses an ORM (such as Sequelize) to update the responsible user's record with the new avatar URL.

- **Cloud Storage:**  
  Integrates with AWS S3 (or similar) to store the avatar image.

- **Authentication:**  
  The JWT token is required and validated for every update request. Only the authenticated user can update their own avatar.

- **Validation:**  
  Validates the uploaded file type and size.

- **Error Handling:**  
  Returns appropriate error messages for invalid input, unauthorized access, or server errors.

**Internal Workflow:**
1. Receives a PUT request with a JWT token and image file.
2. Validates the token and extracts the user ID.
3. Validates the image file (type, size).
4. Uploads the new avatar to cloud storage.
5. Updates the user's profile in the database with the new avatar URL.
6. (Optional) Deletes the old avatar from storage.
7. Returns a success or error response.

## 4. Technologies and Tools Used

- **Language:** Node.js
- **Framework:** Express.js
- **ORM:** Sequelize (or similar)
- **Database:** PostgreSQL
- **Cloud Storage:** AWS S3 (or compatible)
- **Authentication:** jsonwebtoken
- **File Upload:** multer (or similar)
- **Environment Management:** dotenv
- **API Documentation:** Swagger (swagger-jsdoc, swagger-ui-express)
- **CORS:** cors

## 5. Authentication and Security

- **JWT Authentication:**  
  All update operations require a valid JWT token in the `Authorization` header.

- **CORS:**  
  Enabled via the `cors` package to allow cross-origin requests.

- **Input Validation:**  
  Ensures only authenticated users can update their own avatar and that the uploaded file is valid.

## 6. Setup and Running

### Prerequisites

- Node.js (v14+)
- PostgreSQL database
- AWS S3 bucket (or compatible storage)

### Installation

```sh
git clone <repo-url>
cd responsible-profile-domain/update-avatar
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

- Default port: **2008**

## 7. Swagger Documentation

- Access interactive API docs at:  
  [http://localhost:2008/api-docs-updateAvatar](http://localhost:2008/api-docs-updateAvatar)

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