const Employee = require('../model/Employee');

const getAllEmployees = (req,res)=>{
    Employee.find({});
}

const createNewEmployee = async (req,res)=>{
    if (!req.body.firstname || !req.body.lastname) {
        return res.status(404).json({"message":"You must enter a first name and last name"});
    }

    const result = await Employee.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    res.status(201).json(result);
}

const updateEmployee = async (req,res)=>{
    const employee = await Employee.findOne({employeeID: req.params.id}).exec();
    if (!employee) return res.status(400).json({"message":`Employee ${req.params.id} not found`});

    console.log(employee);
    if (req.body.firstname) employee.firstname = req.body.firstname; 
    if (req.body.lastname) employee.lastname = req.body.lastname;


    res.status(201).json(employee);
}

const deleteEmployee = async (req,res) => {
    const employee = await Employee.findOneAndDelete({employeeID: req.params.id}).exec();

    if (!employee) return res.status(400).json({"message":`Employee Id ${req.params.id} not found`});
    
    res.json(employee);
}

const getEmployee = async (req,res) => {
    const employee = await Employee.findOne({employeeID: req.params.id}).exec();
    if(!employee) return res.status(404).json({"message":`The Employee with ID ${req.params.id} not found`});
    res.json(employee);
}


module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}