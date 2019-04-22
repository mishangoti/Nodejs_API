    const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'EmployeeDB',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(8888, () => console.log('Express server is runnig at port no : 8888'));


//Get all employees
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an employees
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an employees
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

// insert an employess
app.post('/employees', (req, res) => {
   	// res.send(req.body);
    let Name = req.body.Name;
    let EmpCode = req.body.EmpCode;
    let Salary = req.body.Salary;
    var sql = "INSERT INTO Employee (Name, EmpCode, Salary) VALUES (?, ?, ?)";
    mysqlConnection.query(sql, [Name, EmpCode, Salary], (err, rows, fields) => {
        if (!err)
            res.send('successfully added');
        else 
            console.log(err);
    })
});

// update an employess
app.put('/employees', (req, res) => {
   	// res.send(req.body);
    let EmpId = req.body.EmpId;
    let Name = req.body.Name;
    let EmpCode = req.body.EmpCode;
    let Salary = req.body.Salary;
    var sql = "UPDATE Employee SET Name = ?, EmpCode = ?, Salary = ? WHERE EmpId = ?";

    // var sql = "INSERT INTO Employee (Name, EmpCode, Salary) VALUES (?, ?, ?)";
    mysqlConnection.query(sql, [Name, EmpCode, Salary, EmpId], (err, rows, fields) => {
        if (!err)
            res.send('successfully updated');
        else
            console.log(err);
    })
});