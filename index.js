//importing the modules
const e = require('express');
var express = require('express')
var app = express();
const cors = require('cors');
let ejs = require("ejs");
const path = require('path');
app.set("view engine", "ejs");
const { ReturnDocument } = require('mongodb');
//adding body parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
const { check, validationResult, body } = require('express-validator');

var DatabaseMongo = require("./DatabaseMongo");
var DatabaseSql = require("./DatabaseSql");


app.listen(3000, () => {
    console.log("Server is listening on port 3000 :)");
});

app.get("/", (req, res) => {
    console.log("Get Request Recieved on /")
    res.render("showMainPage");
})

app.get("/employees", (req, res) => {
    DatabaseSql.getEmployeesList()
        .then((emp) => {
            res.render('employees', { employees: emp })
        })
        .catch((error) => {
            if (error.errno == 1146) {
                res.send("Invalid table: " + error.sqlMessage)
            }
            else (
                res.send(error)
            )
        })
})

app.get("/employees/edit/:eid", (req, res) => {
    DatabaseSql.getEmployeesList()
        .then((employees) => {
            employees.forEach(emp => {
                if(req.params.eid == emp.eid){
                    res.render('employeeEdit', { "employee": emp })
                    return;
                }
            });
        })
        .catch((error) => {
            if (error.errno == 1146) {
                res.send("Invalid table: " + error.sqlMessage)
            }
            else (
                res.send(error)
            )
        })
     })

// app.get("/edit/:eid", (req, res) => {
//     DatabaseSql.getPickEditEmployees(req.params.eid)
//         .then((ee) => {
//             res.render('employeeEdit', { employeeEdit: ee })
//         })
//         .catch((error) => {
//             if (error.errno == 1146) {
//                 res.send("Invalid table: " + error.sqlMessage)
//             }
//             else (
//                 res.send(error)
//             )
//         })
// })

app.post("/employees/edit/:eid",
    (req, res) => {
        console.log(req.body.ename)
        console.log(req.body.role)
        console.log(req.body.salary)
        console.log(req.params.eid)
    //     res.render("employeeEdit",
    //             { employeeEdit: req.body })
        
        DatabaseSql.getEditEmployees(req.params.eid, req.body)
                .then((ue) => {
                    console.log("Updated")
                    console.log(ue)
                }).catch((error) => {
                    console.log("Not updated")
                    console.log(error)
                })

            res.redirect("/employees")

        
    })


    app.get("/departments", (req, res) => {
        DatabaseSql.getDepartment()
            .then((dept) => {
                res.render('departments', { departments: dept })
            })
            .catch((error) => {
                if (error.errno == 1146) {
                    res.send("Invalid table: " + error.sqlMessage)
                }
                else (
                    res.send(error)
                )
            })
    })

    app.get("/departments/departmentDelete/:did", 
    (req, res) => {
        DatabaseSql.getDepartmentDelete()
            .then((departments) => {
                departments.forEach(ept => {
                    if(req.params.did == ept.did){
                        res.render('departments', { "dept": ept })
                        return;
                    }
                });
            })
            .catch((error) => {
                if (error.errno == 1146) {
                    res.send("Invalid table: " + error.sqlMessage)
                }
                else (
                    res.render(getDepartmentDelete)
                )
            })
    })



    app.get("/employeesMongo", (req, res) => {
        DatabaseMongo.getemployeesMongo()
            .then((empMongo) => {
                res.render("employeesMongo", { employeesMongo: empMongo })
            })
            .catch((error) => {
                if (error.errno == 1146) {
                    res.send("Invalid table: " + error.sqlMessage)
                }
                else (
                    res.send(error)
                )
            })
    })

    app.get("/employeesMongo/employeesMongoAdd", (req, res) => {
        DatabaseMongo.getemployeesMongoAdd()
        .then((empMongoadd) => {
            res.render("employeesMongoAdd", { employeesMongoAdd: empMongoadd })
        })
            .catch((error) => {
                if (error.errno == 1146) {
                    res.send("Invalid table: " + error.sqlMessage)
                }
                else (
                    res.send(error)
                )
            })
         })