let data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) {this.employees = data}
};

const getAllEmployees = (req,res)=>{
    res.json(data.employees);
}

const createNewEmployee = (req,res)=>{

    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!req.body.firstname || !req.body.lastname) {
        return res.status(404).json({"message":"You must enter a first name and last name"});
    }

    const newList = [...data.employees, newEmployee];

    console.log(newList);

    data.setEmployees(newList);
    res.status(201).json(data.employees);
}

const updateEmployee = (req,res)=>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));

    if (!employee) return res.status(400).json({"message":`Employee Id ${req.params.id} not found`});

    if (req.body.firstname) employee.firstname = req.body.firstname; 
    if (req.body.lastname) employee.lastname = req.body.lastname;

    const filteredList = data.employees.filter(emp => emp.id !== parseInt(req.params.id));
    const unsortedList = [...filteredList, employee];
    const sortedList = [...unsortedList.sort((a,b) => a.id - b.id)];

    console.log(sortedList);
    data.setEmployees(sortedList);

    res.status(201).json(data.employees);
}

const deleteEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));

    if (!employee) return res.status(400).json({"message":`Employee Id ${req.params.id} not found`});
    
    const filteredList = data.employees.filter(emp => emp.id !== parseInt(req.params.id));
    const sortedList = [...filteredList.sort((a,b) => a.id - b.id)];

    data.setEmployees([...sortedList]);
    console.log(data.employees);
    res.json(data.employees);
}

const getEmployee = (req,res)=> {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    console.log(employee);
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