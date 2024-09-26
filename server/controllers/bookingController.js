const { bookingSchema } = require("../schemas/BookingSchemas");
const validateSchema = require("../utils/validateSchema");
const bookingService = require("../services/bookingService");

exports.getAllUserBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllUserBookings(req.user.id);
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        handleErrors(res, error);
    }
}

exports.getBookingById = async (req, res) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        handleErrors(res, error);
    }
}


exports.bookVehicle = async (req, res) => {
    try {
        // const bookingData =validateSchema(bookingSchema, req.body);
        const bookingData = req.body;
        const renterId = req.user.userId;
        const booking = await bookingService.bookVehicle({...bookingData, renterId});
        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        handleErrors(res, error);
    }      
}


exports.updateBooking = async (req, res) => {
    try {
        const booking = await bookingService.updateBooking(req.params.id, req.body);
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        handleErrors(res, error);
    }
}

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await bookingService.cancelBooking(req.params.id);
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        handleErrors(res, error);
    }
}