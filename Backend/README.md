# Uber Replica Backend API Documentation

## User Endpoints

### 1. Register User

**Endpoint:** `/users/register`
**Method:** `POST`
**Description:** Registers a new user in the application, hashes their password, and generates an authentication token.

#### Request Body

The request body must be sent as JSON and requires the following fields:

| Field                | Type   | Required | Description                                                   |
| :------------------- | :----- | :------- | :------------------------------------------------------------ |
| `fullname.firstname` | String | Yes      | First name of the user (Minimum 3 characters).                |
| `fullname.lastname`  | String | No       | Last name of the user (Minimum 3 characters if provided).     |
| `email`              | String | Yes      | A valid email address (Minimum 5 characters, must be unique). |
| `password`           | String | Yes      | Password for the user account (Minimum 6 characters).         |

**Example Request Payload:**

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

#### Response Details

##### Success Response

* **Status Code:** `200 OK`
* **Content Type:** `application/json`
* **Response Body:** Returns the generated JWT authentication token and the created user object (excluding the password field).

**Example Success Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI3YTFl...",
  "user": {
    "_id": "66b7a1e0b57e7c9bcf281a9f",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "socketId": null
  }
}
```

##### Validation Error Response

* **Status Code:** `400 Bad Request`
* **Content Type:** `application/json`
* **Description:** Returned when validation fails for one or more fields.
* **Response Body:** Contains an array of validation errors.

**Example Error Response:**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "jo",
      "msg": "First name must be atleast 3 character long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be atleast 6 character long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

---

### 2. Login User

**Endpoint:** `/users/login`
**Method:** `POST`
**Description:** Authenticates a user with their email and password and returns an authentication token and user details if successful.

#### Request Body

The request body must be sent as JSON and requires the following fields:

| Field      | Type   | Required | Description                                           |
| :--------- | :----- | :------- | :---------------------------------------------------- |
| `email`    | String | Yes      | A valid email address.                                |
| `password` | String | Yes      | Password for the user account (Minimum 6 characters). |

**Example Request Payload:**

```json
{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

#### Response Details

##### Success Response

* **Status Code:** `200 OK`
* **Content Type:** `application/json`
* **Response Body:** Returns the generated JWT authentication token and the authenticated user object.

**Example Success Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI3YTFl...",
  "user": {
    "_id": "66b7a1e0b57e7c9bcf281a9f",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "socketId": null
  }
}
```

##### Validation Error Response

* **Status Code:** `400 Bad Request`
* **Content Type:** `application/json`
* **Description:** Returned when validation fails (e.g. invalid email format or password too short).
* **Response Body:** Contains an array of validation errors.

**Example Error Response:**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

##### Unauthorized Error Response

* **Status Code:** `401 Unauthorized`
* **Content Type:** `application/json`
* **Description:** Returned when the email or password is incorrect.
* **Response Body:** Contains an error message.

**Example Error Response:**

```json
{
  "message": "Invalid email or password"
}
```

---

### 3. Get User Profile

**Endpoint:** `/users/profile`
**Method:** `GET`
**Description:** Returns the profile information of the currently authenticated user.

#### Headers

| Header          | Value                | Required |
| :-------------- | :------------------- | :------- |
| `Authorization` | `Bearer <jwt_token>` | Yes      |

#### Response Details

##### Success Response

* **Status Code:** `200 OK`
* **Content Type:** `application/json`
* **Response Body:** Returns the authenticated user's details.

**Example Success Response:**

```json
{
  "_id": "66b7a1e0b57e7c9bcf281a9f",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "socketId": null
}
```

##### Unauthorized Response

* **Status Code:** `401 Unauthorized`
* **Content Type:** `application/json`
* **Description:** Returned when the authentication token is missing, invalid, or expired.

**Example Error Response:**

```json
{
  "message": "Unauthorized"
}
```

---

### 4. Logout User

**Endpoint:** `/users/logout`
**Method:** `GET`
**Description:** Logs out the currently authenticated user by invalidating the JWT token and clearing the authentication cookie.

#### Headers

| Header          | Value                | Required |
| :-------------- | :------------------- | :------- |
| `Authorization` | `Bearer <jwt_token>` | Yes      |

#### Response Details

##### Success Response

* **Status Code:** `200 OK`
* **Content Type:** `application/json`
* **Response Body:** Returns a logout confirmation message.

**Example Success Response:**

```json
{
  "message": "Logged out successfully"
}
```

##### Unauthorized Response

* **Status Code:** `401 Unauthorized`
* **Content Type:** `application/json`
* **Description:** Returned when the authentication token is missing, invalid, or expired.

**Example Error Response:**

```json
{
  "message": "Unauthorized"
}
```

---

## Captain Endpoints

### 1. Register Captain

**Endpoint:** `/captains/register`
**Method:** `POST`
**Description:** Registers a new captain in the application, hashes the password, creates a vehicle profile, and generates an authentication token.

#### Request Body

The request body must be sent as JSON and requires the following fields:

| Field                 | Type   | Required | Description                                                   |
| :-------------------- | :----- | :------- | :------------------------------------------------------------ |
| `fullname.firstname`  | String | Yes      | First name of the captain (Minimum 3 characters).             |
| `fullname.lastname`   | String | No       | Last name of the captain (Minimum 3 characters if provided).  |
| `email`               | String | Yes      | A valid email address (Must be unique).                       |
| `password`            | String | Yes      | Password for the captain account (Minimum 6 characters).      |
| `vehicle.color`       | String | Yes      | Vehicle color (Minimum 3 characters).                         |
| `vehicle.plate`       | String | Yes      | Vehicle registration number (Minimum 3 characters).           |
| `vehicle.capacity`    | Number | Yes      | Seating capacity of the vehicle (Minimum value: 1).           |
| `vehicle.vehicleType` | String | Yes      | Type of vehicle. Allowed values: `car`, `motorcycle`, `auto`. |

**Example Request Payload:**

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword123",
  "vehicle": {
    "color": "Black",
    "plate": "MH12AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Response Details

##### Success Response

* **Status Code:** `201 Created`
* **Content Type:** `application/json`
* **Response Body:** Returns the generated JWT authentication token and the created captain object (excluding the password field).

**Example Success Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI3YTFl...",
  "captain": {
    "_id": "66b7a1e0b57e7c9bcf281a9f",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "status": "inactive",
    "socketId": null,
    "vehicle": {
      "color": "Black",
      "plate": "MH12AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

##### Validation Error Response

* **Status Code:** `400 Bad Request`
* **Content Type:** `application/json`
* **Description:** Returned when validation fails for one or more fields.
* **Response Body:** Contains an array of validation errors.

**Example Error Response:**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "jo",
      "msg": "First name must be atleast 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "value": "12",
      "msg": "Number plate must be atleast 3 characters long",
      "path": "vehicle.plate",
      "location": "body"
    },
    {
      "type": "field",
      "value": "truck",
      "msg": "Invalid vehicle type",
      "path": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

##### Missing Fields Error Response

* **Status Code:** `400 Bad Request`
* **Content Type:** `application/json`
* **Description:** Returned when one or more required fields are missing.

**Example Error Response:**

```json
{
  "message": "All fields are required"
}
```

---

### 2. Login Captain

**Endpoint:** `/captains/login`
**Method:** `POST`
**Description:** Authenticates a captain using their email and password and returns an authentication token and captain details if successful.

#### Request Body

The request body must be sent as JSON and requires the following fields:

| Field      | Type   | Required | Description                                              |
| :--------- | :----- | :------- | :------------------------------------------------------- |
| `email`    | String | Yes      | A valid email address.                                   |
| `password` | String | Yes      | Password for the captain account (Minimum 6 characters). |

**Example Request Payload:**

```json
{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

#### Response Details

##### Success Response

* **Status Code:** `200 OK`
* **Content Type:** `application/json`
* **Response Body:** Returns the generated JWT authentication token and the authenticated captain object.

**Example Success Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI3YTFl...",
  "captain": {
    "_id": "66b7a1e0b57e7c9bcf281a9f",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "status": "inactive",
    "socketId": null,
    "vehicle": {
      "color": "Black",
      "plate": "MH12AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

##### Validation Error Response

* **Status Code:** `400 Bad Request`
* **Content Type:** `application/json`
* **Description:** Returned when validation fails (e.g. invalid email format or password too short).
* **Response Body:** Contains an array of validation errors.

**Example Error Response:**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

##### Unauthorized Error Response

* **Status Code:** `401 Unauthorized`
* **Content Type:** `application/json`
* **Description:** Returned when the email or password is incorrect.
* **Response Body:** Contains an error message.

**Example Error Response:**

```json
{
  "message": "Invalid email or password"
}
```

---

### 3. Get Captain Profile

**Endpoint:** `/captains/profile`
**Method:** `GET`
**Description:** Returns the profile information of the currently authenticated captain.

#### Headers

| Header          | Value                | Required |
| :-------------- | :------------------- | :------- |
| `Authorization` | `Bearer <jwt_token>` | Yes      |

#### Response Details

##### Success Response

* **Status Code:** `200 OK`
* **Content Type:** `application/json`
* **Response Body:** Returns the authenticated captain's details.

**Example Success Response:**

```json
{
  "captain": {
    "_id": "66b7a1e0b57e7c9bcf281a9f",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "status": "inactive",
    "socketId": null,
    "vehicle": {
      "color": "Black",
      "plate": "MH12AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

##### Unauthorized Response

* **Status Code:** `401 Unauthorized`
* **Content Type:** `application/json`
* **Description:** Returned when the authentication token is missing, invalid, or expired.

**Example Error Response:**

```json
{
  "message": "Unauthorized"
}
```

---

### 4. Logout Captain

**Endpoint:** `/captains/logout`
**Method:** `GET`
**Description:** Logs out the currently authenticated captain by invalidating the JWT token, adding it to the blacklist, and clearing the authentication cookie.

#### Headers

| Header          | Value                | Required |
| :-------------- | :------------------- | :------- |
| `Authorization` | `Bearer <jwt_token>` | Yes      |

#### Response Details

##### Success Response

* **Status Code:** `200 OK`
* **Content Type:** `application/json`
* **Response Body:** Returns a logout confirmation message.

**Example Success Response:**

```json
{
  "message": "Logout Successfully"
}
```

##### Unauthorized Response

* **Status Code:** `401 Unauthorized`
* **Content Type:** `application/json`
* **Description:** Returned when the authentication token is missing, invalid, or expired.

**Example Error Response:**

```json
{
  "message": "Unauthorized"
}
```


