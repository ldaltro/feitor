
# Feitor-Next Mobile API Documentation

This document provides a comprehensive guide to interacting with the Feitor-Next backend API. It is intended for developers building the mobile application.

## Table of Contents

1.  [Authentication](#authentication)
2.  [API Endpoints](#api-endpoints)
    *   [Animals](#animals)
    *   [Births](#births)
    *   [Events](#events)

### Births

**Note:** The following functionality is currently implemented as Next.js Server Actions. To be accessible by the mobile app, a dedicated REST API endpoint (e.g., `/api/births`) will need to be created to expose these actions.

*   **Endpoint:** `/api/births` (to be created)
*   **Methods:** `GET`, `POST`

#### GET /api/births

Retrieves a list of all births for the user's farm.

*   **Headers:** Requires authentication headers.
*   **Success Response (200 OK):**
    ```json
    [
      {
        "id": "clx7d...",
        "birthDate": "2024-06-15T00:00:00.000Z",
        "mother": {
          "id": "clx3z...",
          "name": "MooMoo"
        },
        "father": {
          "id": "clx4a...",
          "name": "Bessie"
        }
      }
    ]
    ```

#### POST /api/births

Creates a new birth record and a corresponding animal record.

*   **Headers:** Requires authentication headers.
*   **Request Body:**
    ```json
    {
      "birthDate": "2024-07-20",
      "motherId": "clx3z...",
      "fatherId": "clx4a...",
      "notes": "Easy birth.",
      "newbornCount": 1,
      "childName": "Calf",
      "childTag": "67890",
      "breed": "Angus",
      "gender": "Male",
      "status": "Active"
    }
    ```
*   **Success Response (201 Created):**
    ```json
    {
      "success": true,
      "data": {
        "animal": { ... },
        "birth": { ... }
      }
    }
    ```

---

*   **Endpoint:** `/api/births/{id}` (to be created)
*   **Methods:** `GET`, `DELETE`

#### GET /api/births/{id}

Retrieves a single birth record by its ID.

*   **Headers:** Requires authentication headers.
*   **Success Response (200 OK):** The birth object.

#### DELETE /api/births/{id}

Deletes a birth record.

*   **Headers:** Requires authentication headers.
*   **Success Response (200 OK):**
    ```json
    {
      "success": true
    }
    ```

    *   [Lotes](#lotes)
    *   [Transactions](#transactions)

### Lotes

**Note:** The following functionality is currently implemented as Next.js Server Actions. To be accessible by the mobile app, a dedicated REST API endpoint (e.g., `/api/lotes`) will need to be created to expose these actions.

*   **Endpoint:** `/api/lotes` (to be created)
*   **Methods:** `GET`, `POST`

#### GET /api/lotes

Retrieves a list of all lotes for the user's farm.

*   **Headers:** Requires authentication headers.
*   **Success Response (200 OK):**
    ```json
    [
      {
        "id": "clx6c...",
        "nome": "Lote de Cria",
        "descricao": "Lote para vacas em período de cria.",
        "finalidade": "Cria",
        "animalCount": 10,
        "breedCounts": {
          "Nelore": 5,
          "Angus": 5
        }
      }
    ]
    ```

#### POST /api/lotes

Creates a new lote.

*   **Headers:** Requires authentication headers.
*   **Request Body:**
    ```json
    {
      "nome": "Lote de Engorda",
      "descricao": "Lote para animais em fase de engorda.",
      "finalidade": "Engorda"
    }
    ```
*   **Success Response (201 Created):** The newly created lote object.

---

*   **Endpoint:** `/api/lotes/{id}` (to be created)
*   **Methods:** `GET`, `PUT`, `DELETE`

#### GET /api/lotes/{id}

Retrieves a single lote by its ID.

*   **Headers:** Requires authentication headers.
*   **Success Response (200 OK):** The lote object, including the list of animals in it.

#### PUT /api/lotes/{id}

Updates an existing lote.

*   **Headers:** Requires authentication headers.
*   **Request Body:** Same as POST /api/lotes.
*   **Success Response (200 OK):** The updated lote object.

#### DELETE /api/lotes/{id}

Deletes a lote.

*   **Headers:** Requires authentication headers.
*   **Success Response (200 OK):**
    ```json
    {
      "success": true
    }
    ```

---

*   **Endpoint:** `/api/lotes/{id}/animals` (to be created)
*   **Methods:** `POST`, `DELETE`

#### POST /api/lotes/{id}/animals

Adds an animal to a lote.

*   **Headers:** Requires authentication headers.
*   **Request Body:**
    ```json
    {
      "animalId": "clx3z..."
    }
    ```
*   **Success Response (200 OK):**
    ```json
    {
      "success": true
    }
    ```

#### DELETE /api/lotes/{id}/animals

Removes an animal from a lote.

*   **Headers:** Requires authentication headers.
*   **Request Body:**
    ```json
    {
      "animalId": "clx3z..."
    }
    ```
*   **Success Response (200 OK):**
    ```json
    {
      "success": true
    }
    ```


### Transactions

**Note:** The following functionality is currently implemented as Next.js Server Actions. To be accessible by the mobile app, a dedicated REST API endpoint (e.g., `/api/transactions`) will need to be created to expose these actions.

*   **Endpoint:** `/api/transactions` (to be created)
*   **Methods:** `GET`, `POST`

#### GET /api/transactions

Retrieves a list of all transactions for the user's farm.

*   **Headers:** Requires authentication headers.
*   **Success Response (200 OK):**
    ```json
    [
      {
        "id": "clx8e...",
        "date": "2024-06-20T00:00:00.000Z",
        "type": "Compra",
        "value": 1500.00,
        "person": "Fazenda vizinha",
        "animal": {
          "id": "clx3z...",
          "name": "MooMoo"
        }
      }
    ]
    ```

#### POST /api/transactions

Creates a new transaction.

*   **Headers:** Requires authentication headers.
*   **Request Body:**
    ```json
    {
      "date": "2024-07-25",
      "type": "Venda",
      "amount": 2000.00,
      "description": "Venda para o frigorífico",
      "animalId": "clx3z..."
    }
    ```
*   **Success Response (201 Created):** The newly created transaction object.

---

*   **Endpoint:** `/api/transactions/{id}` (to be created)
*   **Methods:** `GET`, `DELETE`

#### GET /api/transactions/{id}

Retrieves a single transaction by its ID.

*   **Headers:** Requires authentication headers.
*   **Success Response (200 OK):** The transaction object.

#### DELETE /api/transactions/{id}

Deletes a transaction.

*   **Headers:** Requires authentication headers.
*   **Success Response (200 OK):**
    ```json
    {
      "success": true
    }
    ```

3.  [Data Models](#data-models)(#data-models)

### Events

*   **Endpoint:** `/api/events`
*   **Methods:** `GET`, `POST`

#### GET /api/events

Retrieves a list of all events for the user's farm.

*   **Headers:** Requires authentication headers.
*   **Success Response (200 OK):**
    ```json
    [
      {
        "id": "clx5b...",
        "title": "Vaccination Drive",
        "type": "Manejo Sanitário",
        "date": "2024-06-01T00:00:00.000Z",
        "description": "Annual vaccination for all animals.",
        "animals": [
          {
            "animal": {
              "id": "clx3z...",
              "name": "MooMoo",
              "tag": "12345"
            }
          }
        ]
      }
    ]
    ```

#### POST /api/events

Creates a new event.

*   **Headers:** Requires authentication headers.
*   **Request Body:**
    ```json
    {
      "title": "Deworming",
      "type": "Manejo Sanitário",
      "date": "2024-07-15",
      "description": "Deworming session for the herd.",
      "animals": ["clx3z...", "clx4a..."]
    }
    ```
*   **Success Response (201 Created):** The newly created event object, including the animals.

---

*   **Endpoint:** `/api/events/{id}`
*   **Methods:** `GET`, `PUT`, `DELETE`

#### GET /api/events/{id}

Retrieves a single event by its ID.

*   **Headers:** Requires authentication headers.
*   **Success Response (200 OK):** The event object.

#### PUT /api/events/{id}

Updates an existing event.

*   **Headers:** Requires authentication headers.
*   **Request Body:** Same as POST /api/events.
*   **Success Response (200 OK):** The updated event object.

#### DELETE /api/events/{id}

Deletes an event.

*   **Headers:** Requires authentication headers.
*   **Success Response (200 OK):**
    ```json
    {
      "success": true
    }
    ```

---

## 1. Authentication

Authentication is handled via JSON Web Tokens (JWT). The mobile application must acquire a token through the login endpoint and include it in the header of all subsequent requests.

**Authentication Headers:**

| Header | Description | Example |
| :--- | :--- | :--- |
| `Authorization` | The JWT token, prefixed with "Bearer ". | `Bearer eyJhbGciOiJIUzI1NiIsIn...` |
| `x-user-id` | The ID of the authenticated user. | `clx2x...` |
| `x-user-role` | The role of the authenticated user (`ADMIN`, `OWNER`, `EMPLOYEE`). | `OWNER` |
| `x-user-farm-id` | The ID of the farm associated with the user. | `clx2y...` |

**Login Endpoint:**

*   **Endpoint:** `POST /api/auth/login`
*   **Request Body:**
    ```json
    {
      "username": "user@example.com",
      "password": "yourpassword"
    }
    ```
*   **Success Response (200 OK):**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsIn...",
      "user": {
        "id": "clx2x...",
        "username": "user@example.com",
        "role": "OWNER",
        "farmId": "clx2y..."
      }
    }
    ```

---

## 2. API Endpoints

### Animals

*   **Endpoint:** `/api/animals`
*   **Methods:** `GET`, `POST`

#### GET /api/animals

Retrieves a list of all animals for the user's farm.

*   **Headers:** Requires authentication headers.
*   **Success Response (200 OK):**
    ```json
    [
      {
        "id": "clx3z...",
        "name": "MooMoo",
        "tag": "12345",
        "breed": "Angus",
        "status": "Active",
        "birthDate": "2023-01-15T00:00:00.000Z",
        "createdAt": "2024-05-20T10:00:00.000Z"
      }
    ]
    ```

#### POST /api/animals

Creates a new animal.

*   **Headers:** Requires authentication headers.
*   **Request Body:**
    ```json
    {
      "name": "Bessie",
      "tag": "54321",
      "breed": "Holstein",
      "gender": "Female",
      "birthDate": "2023-05-20",
      "status": "Active",
      "weight": 500.5,
      "purchaseValue": 1500.00,
      "purchaseDate": "2023-08-01",
      "notes": "A very good cow."
    }
    ```
*   **Success Response (201 Created):**
    ```json
    {
      "id": "clx4a...",
      "name": "Bessie",
      "tag": "54321",
      "breed": "Holstein",
      "gender": "Female",
      "birthDate": "2023-05-20T00:00:00.000Z",
      "status": "Active",
      "weight": 500.5,
      "purchaseValue": 1500,
      "purchaseDate": "2023-08-01T00:00:00.000Z",
      "notes": "A very good cow.",
      "farmId": "clx2y..."
    }
    ```

---

## 3. Data Models

*(Based on `prisma/schema.prisma`)*

**Animal:**

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Unique identifier |
| `name` | String | Animal's name |
| `tag` | String | Unique tag/identifier for the animal within a farm |
| `breed` | String | Breed of the animal |
| `gender` | String | `Male` or `Female` |
| `birthDate` | DateTime | Animal's date of birth |
| `status` | String | e.g., `Active`, `Sold`, `Deceased` |
| `reproductiveStatus` | String? | e.g., `Não gestante`, `Inseminada`, `Gestante` |
| `inseminationDate` | DateTime? | Date of insemination |
| `expectedBirthDate` | DateTime? | Expected date of birth |
| `abortionDate` | DateTime? | Date of abortion |
| `weight` | Float? | Weight in kilograms |
| `notes` | String? | General notes |
| `purchaseDate` | DateTime? | Date of purchase |
| `purchaseValue` | Float? | Value of the animal at purchase |
| `farmId` | String | Foreign key for the `Farm` |
| `loteId` | String? | Foreign key for the `Lote` |

*(Other models like `Birth`, `Transaction`, `Event`, `Lote`, `Farm`, `User` will be documented as their corresponding API endpoints are analyzed.)*
