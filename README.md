# Responsible Domain

## 1. General Overview

The **Responsible Domain** is a set of microservices dedicated to the management of responsible users within a pet management platform. This domain covers the full lifecycle of a responsible user, including registration, profile updates, avatar management (upload, update, delete, list), and secure access to user data. The domain is designed with scalability, modularity, and security in mind, leveraging modern technologies and best practices.

### Microservices in the Domain

- **register**: Handles user registration.
- **update-responsible**: Allows users to update their profile information.
- **delete-responsible**: Enables users to delete their profile.
- **get-all-responsibles**: Retrieves a list of all responsible users.
- **get-responsible-by-id**: Fetches details of a responsible user by ID.
- **upload-avatar**: Handles avatar image uploads.
- **update-avatar**: Allows users to update their avatar image.
- **delete-avatar**: Enables users to delete their avatar image.
- **get-all-avatars**: Retrieves all avatars in the system.

### Technologies and Tools

- **Node.js** & **Express.js**: Backend runtime and web framework.
- **Sequelize**: ORM for PostgreSQL.
- **PostgreSQL**: Relational database.
- **AWS S3**: Cloud storage for avatar images.
- **JWT (jsonwebtoken)**: Authentication.
- **dotenv**: Environment variable management.
- **multer**: File upload handling.
- **Swagger**: API documentation.
- **CORS**: Cross-origin resource sharing.

---

## 2. Domain Folder Structure

```
responsible-profile-domain/
│
├── register/
├── update-responsible/
├── delete-responsible/
├── get-all-responsibles/
├── get-responsible-by-id/
├── upload-avatar/
├── update-avatar/
├── delete-avatar/
├── get-all-avatars/
│
└── README.md
```

- **Each microservice folder** contains its own `controllers`, `routes`, `services`, `models`, `middlewares`, and configuration files.
- **controllers/**: Handle HTTP requests and responses.
- **routes/**: Define API endpoints.
- **services/**: Business logic and database interaction.
- **models/**: Sequelize models for database tables.
- **middlewares/**: Authentication, validation, and error handling.
- **config/**: Database and environment configuration.

---

## 3. Technologies Used

- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Web framework for routing and middleware.
- **Sequelize**: ORM for PostgreSQL, managing models and migrations.
- **PostgreSQL**: Main database for storing user and avatar data.
- **AWS S3**: Storage for avatar images.
- **jsonwebtoken**: JWT-based authentication across all microservices.
- **multer**: Middleware for handling multipart/form-data (file uploads).
- **dotenv**: Loads environment variables from `.env` files.
- **Swagger**: API documentation and interactive testing.
- **CORS**: Enables secure cross-origin requests.

**Microservices interact via REST APIs** and share authentication using JWT tokens. Avatar operations interact with AWS S3 for file storage.

---

## 4. General Domain Workflow

1. **User Registration**:  
   The user registers via the `register` microservice, which stores their data in PostgreSQL.

2. **Authentication**:  
   JWT tokens are issued and required for all protected endpoints.

3. **Profile Management**:  
   Users can update or delete their profile using the respective microservices.

4. **Avatar Management**:  
   Users can upload, update, delete, or list avatars. Images are stored in AWS S3, and URLs are saved in the database.

5. **Data Retrieval**:  
   Microservices provide endpoints to fetch all users, a user by ID, or all avatars.

**Microservices communicate via RESTful APIs, and all sensitive operations require JWT authentication.**

---

## 5. API Routes and Endpoints

Below is a summary of the main endpoints for each microservice:

### register

- **POST /responsibles**
  - Registers a new user.
  - **Request:** `{ "name": "...", "email": "...", ... }`
  - **Response:** `{ "message": "Registered successfully", "user": { ... } }`

### update-responsible

- **PUT /responsibles**
  - Updates user profile.
  - **Headers:** `Authorization: Bearer <JWT>`
  - **Request:** `{ "name": "...", ... }`
  - **Response:** `{ "message": "Updated", "responsible": { ... } }`

### delete-responsible

- **DELETE /responsibles**
  - Deletes user profile.
  - **Headers:** `Authorization: Bearer <JWT>`
  - **Response:** `{ "message": "Responsible deleted successfully." }`

### get-all-responsibles

- **GET /responsibles**
  - Lists all users.
  - **Response:** `[ { "id": "...", "name": "...", ... }, ... ]`

### get-responsible-by-id

- **GET /responsibles/:id**
  - Gets user by ID.
  - **Response:** `{ "id": "...", "name": "...", ... }`

### upload-avatar

- **POST /avatars**
  - Uploads a new avatar.
  - **Headers:** `Authorization: Bearer <JWT>`
  - **Body:** `multipart/form-data` with `avatar` file.
  - **Response:** `{ "message": "Avatar uploaded successfully.", "avatarUrl": "..." }`

### update-avatar

- **PUT /avatars**
  - Updates avatar image.
  - **Headers:** `Authorization: Bearer <JWT>`
  - **Body:** `multipart/form-data` with `avatar` file.
  - **Response:** `{ "message": "Avatar updated successfully.", "avatarUrl": "..." }`

### delete-avatar

- **DELETE /avatars**
  - Deletes avatar image.
  - **Headers:** `Authorization: Bearer <JWT>`
  - **Response:** `{ "message": "Avatar deleted successfully." }`

### get-all-avatars

- **GET /avatars**
  - Lists all avatars.
  - **Response:** `[ { "userId": "...", "avatar": "..." }, ... ]`

**Example cURL for uploading an avatar:**
```sh
curl -X POST http://localhost:2009/avatars \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "avatar=@/path/to/avatar.jpg"
```

---

## 6. Setup and Running

### Prerequisites

- Node.js (v14+)
- PostgreSQL database
- AWS S3 bucket (for avatar storage)

### Installation

For each microservice:

```sh
cd responsible-profile-domain/<microservice>
npm install
```

### Environment Variables

Each microservice requires a `.env` file with variables such as:

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

### Running the Services

```sh
npm start
```

Each service runs on its own port (e.g., 2001, 2002, ...).

---

## 7. Authentication and Security

- **JWT Authentication**: All protected endpoints require a valid JWT in the `Authorization` header.
- **CORS**: Enabled via the `cors` package for secure cross-origin requests.
- **Input Validation**: All input is validated to prevent invalid or malicious data.

---

## 8. Swagger Documentation

Each microservice exposes its own Swagger documentation for interactive API testing.  
Example URLs:

- `http://localhost:2001/api-docs-register`
- `http://localhost:2002/api-docs-updateRes`
- `http://localhost:2003/api-docs-deleteRes`
- `http://localhost:2004/api-docs-deleteAvatar`
- `http://localhost:2005/api-docs-getAllResponsibles`
- `http://localhost:2006/api-docs-getAllAvatars`
- `http://localhost:2007/api-docs-getResponsibleById`
- `http://localhost:2008/api-docs-updateAvatar`
- `http://localhost:2009/api-docs-uploadAvatar`

---

## 9. Contributing

1. Fork the repository and create a new branch.
2. Make your changes and add tests if necessary.
3. Run tests locally to ensure nothing is broken.
4. Submit a pull request with a clear description of your changes.

---

## 10. License

This domain is licensed under the ISC License. See the [LICENSE](LICENSE) file