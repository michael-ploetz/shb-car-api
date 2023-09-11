const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Array to store cars data
const cars = [];

// Dummy event data
const dummyEvents = [
    {
        label: 'Production Started',
        type: 'start',
        description: 'Production of the car has started.',
    },
    {
        label: 'First Parts Delivered',
        type: 'milestone',
        description: 'The first parts were delivered to the production site.',
    },
];

// Helper function to generate a timestamp
function getCurrentTimestamp() {
    return new Date().toISOString();
}

// Route to handle POST requests to /cars
app.post('/cars', (req, res) => {
    const newCar = req.body;

    // Check if the request body contains the "sfId" attribute
    if (!newCar || !newCar.sfId) {
        return res.status(400).json({ error: 'Invalid request data. "sfId" attribute is required.' });
    }

    // Check if a car with the same "sfId" already exists in the array
    const duplicateCar = cars.find((car) => car.sfId === newCar.sfId);

    if (duplicateCar) {
        return res.status(409).json({ error: 'Car with the same sfId already exists.' });
    }

    // Add the "events" attribute with dummy data to the new car
    newCar.events = dummyEvents.map((event) => ({
        ...event,
        createdDate: getCurrentTimestamp(),
    }));

    // Add the new car data to the cars array
    cars.push(newCar);

    // Respond with the updated list of cars
    res.json({ message: 'Car added successfully', cars });
});

// Route to handle GET requests to /cars
app.get('/cars', (req, res) => {
    // Return the cars array as JSON response
    res.json(cars);
});

// Route to handle POST requests to /cars/{:sfId}/events
app.post('/cars/:sfId/events', (req, res) => {
    const sfId = req.params.sfId;
    const newEvent = req.body;

    // Find the car with the specified sfId
    const car = cars.find((car) => car.sfId === sfId);

    if (!car) {
        return res.status(404).json({ error: 'Car not found.' });
    }

    if (!newEvent || !newEvent.label || !newEvent.type || !newEvent.description) {
        return res.status(400).json({ error: 'Invalid event data. "label", "type", and "description" attributes are required.' });
    }

    // Add the "createdDate" attribute to the new event
    newEvent.createdDate = getCurrentTimestamp();

    // Add the new event to the car's events array
    car.events.push(newEvent);

    // Respond with the updated car data
    res.json({ message: 'Event added to the car successfully', car });
});

// Start the server on port 3000 (or any port you prefer)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
