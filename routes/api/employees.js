const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeesControler');

router.route('/')
    .get(employeeController.getAllEmployees)
    .post(employeeController.createNewEmployee)

router.route('/:id')
    .get(employeeController.getEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

module.exports = router;