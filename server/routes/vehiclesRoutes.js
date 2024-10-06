const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');
const paginatedResults = require('../middlewares/paginatedResults');
const setUplodType = require("../middlewares/setUploadType");


const getVehicleFilter = (req) => {
    return { available: true}; 
};


const searchAvailableVehicles = (req) => {
    const { search = '' } = req.query;

    const filter = { available: true };

    if (search) {
        filter.OR = [
            { name: { contains: search } },
            { type: { contains: search } }
        ];
    }
    console.log(filter);
    return filter;

};

  
// Public route to search vehicles
router.get('/available', paginatedResults('Vehicle', searchAvailableVehicles), vehicleController.getAvailableVehicles);
router.get('/search', vehicleController.searchVehicles);
router.get('/:id', vehicleController.getVehicle);

// Protected routes 
router.post('/add',authMiddleware("OWNER"),setUplodType('VEHICLE'),upload.single('vehicleImage'), vehicleController.addVehicle);
router.put('/:id', authMiddleware("OWNER"), vehicleController.updateVehicle);
router.delete('/:id', authMiddleware("OWNER"), vehicleController.deleteVehicle);
router.put('/available/:id', authMiddleware("OWNER"), vehicleController.updateVehicleAvailability);


//get all bookings list of a vehicle 
router.get('/bookings/:id', authMiddleware("ADMIN"), vehicleController.getVehicleBookings);
module.exports = router;
