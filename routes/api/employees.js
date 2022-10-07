const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeesControler');
const ROLES_LIST = require('../../config/roles');
const verifyRoles = require('../../middleware/verifyRole');

router.route('/')
    .get(employeeController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeeController.createNewEmployee)

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeeController.getEmployee)
    .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeeController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin),employeeController.deleteEmployee);

module.exports = router;