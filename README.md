# Car Management API Documentation

## Introduction

This is a simple API for managing cars and their production events. It provides endpoints to create cars, retrieve a list of cars, and add events to specific cars.

## Endpoints

### 1. Create a Car

- **Endpoint:** `POST /cars`
- **Description:** Create a new car and add it to the list of cars.
- **Parameters:**
  - `sfId` (string, required): A unique identifier for the car.

**Example Request Body:**

```json
{
  "sfId": "ABCD12345"
}
```

### 2. Retrieve List of Cars

- **Endpoint:** `GET /cars`
- **Description:** Get a list of all cars, including their associated events.

**Example Response:**

```json
[
  {
    "sfId": "ABCD12345",
    "events": [
      {
        "label": "Production Started",
        "type": "start",
        "description": "Production of the car has started.",
        "createdDate": "2023-09-12T12:34:56.789Z"
      },
      {
        "label": "First Parts Delivered",
        "type": "milestone",
        "description": "The first parts were delivered to the production site.",
        "createdDate": "2023-09-12T13:45:00.123Z"
      }
    ]
  },
  // ...other cars
]
```

### 3. Add an Event to a Car

- **Endpoint:** `POST /cars/{:sfId}/events`
- **Description:** Add an event to a specific car by providing the car's `sfId`.
- **Parameters:**
  - `label` (string, required): The label or name of the event.
  - `type` (string, required): The type of the event (e.g., "start," "milestone").
  - `label` (string, required): A description of the event.

**Example Request  (for adding an event to a car with sfId "ABCD12345"):**

```json
{
  "label": "Quality Check",
  "type": "milestone",
  "description": "Quality check completed for the car."
}
```

**Example Response (updated car with the added event):**

```json
{
  "sfId": "ABCD12345",
  "events": [
    {
      "label": "Production Started",
      "type": "start",
      "description": "Production of the car has started.",
      "createdDate": "2023-09-12T12:34:56.789Z"
    },
    {
      "label": "First Parts Delivered",
      "type": "milestone",
      "description": "The first parts were delivered to the production site.",
      "createdDate": "2023-09-12T13:45:00.123Z"
    },
    {
      "label": "Quality Check",
      "type": "milestone",
      "description": "Quality check completed for the car.",
      "createdDate": "2023-09-12T14:56:12.345Z"
    }
  ]
}
```

## Error Handling

- The API returns appropriate error responses for missing or invalid parameters, duplicate cars, and non-existent cars.

**Example Response:**

```json
{ 
    "error": "Invalid request data. 'sfId' attribute is required." 
}
```
