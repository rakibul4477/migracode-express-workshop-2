const express = require("express");
const bodyParser = require("body-parser");
const boom = require("@hapi/boom");
const utils = require("./utils");
const app = express();

app.use(bodyParser.json()); // before our routes definition

app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.get("/bookings", function (req, res) {
    res.send(utils.getAllBookings());
});
app.get("/bookings/:bookingId", function (req, res) {
    const booking = parseInt(req.params.bookingId)
    if (utils.checkBookingExists(booking)) {
        console.log('oh yeah', booking);
        res.send(utils.getBooking(booking))

    } else {
        res.status(404).send('Not found');
    }
});
app.post("/bookings", function (req, res) {
    const newBooking = req.body

    if (utils.checkBookingExists(newBooking.id)) {
        res.status(400).send('bed request');

    } else {
        const createdBooking = utils.createBooking(newBooking)
        res.send(createdBooking)
    }
});
app.delete("/bookings/:bookingId", function (req, res) {
    const booking = parseInt(req.params.bookingId)
    if (utils.checkBookingExists(booking)) {
        res.send(utils.deleteBooking(booking))
    } else {
        res.status(404).send('not found');
    }
});
app.put("/bookings/:bookingId", function (req, res) {
    const booking = parseInt(req.params.bookingId)
    if (utils.checkBookingExists(booking)) {
        res.send(utils.editBooking(booking,req.body));

    } else {
        res.status(404).send('Not found');
    }
});


app.listen(3000, function () {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});