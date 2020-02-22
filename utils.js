const data = require('./data');

/**
 * Checks that a booking with the passed id
 *
 * @param {string} id The id to check
 */
function checkBookingExists(id) {
  const booking = data.find((item) => item.id === id);

  return !!booking;
}

/**
 * Creates a new booking. Throws an error if the id already exists
 *
 * @param {object} booking A booking object
 */
function createBooking(booking) {
  if (checkBookingExists(booking.id)) {
    throw new Error(`Booking with id ${booking.id} already exists`);
  }

  data.push(booking);

  return booking;
}

/**
 * Deletes a booking and returns the deleted booking.
 * Throws an error if the booking does not exist
 *
 * @param {string} id The booking to delete
 */
function deleteBooking(id) {
  const indexForDeletion = data.findIndex((item) => item.id === id);

  if (indexForDeletion === -1) {
    return new Error(`Booking with id ${id} does not exist`);
  }

  const [deleted] = data.splice(indexForDeletion, 1);

  return deleted;
}

/**
 * Edits a booking. Throws an error if the booking does not exist
 *
 * @param {string} id - The booking id
 * @param {object} booking The booking object
 */
function editBooking(id, booking) {
  const indexForUpdate = data.findIndex((item) => item.id === id);

  if (indexForUpdate === -1) {
    return new Error(`Booking with id ${id} does not exist`);
  }

  data[indexForUpdate] = booking;

  return booking;
}

/**
 * Returns an array with bookings
 */
function getAllBookings() {
  return data;
}

/**
 * Returns the booking for the given id. Throws an error if the booking does not exist
 *
 * @param {string} id Booking id
 */
function getBooking(id) {
  const booking = data.find((item) => item.id === id);

  if (!booking) {
    throw new Error(`Booking with id ${id} does not exist`);
  }

  return booking;
}

module.exports = {
  checkBookingExists,
  createBooking,
  deleteBooking,
  editBooking,
  getAllBookings,
  getBooking,
};