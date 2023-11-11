const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const app = express();
const mysql = require("mysql");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
})

db.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Database Connected");
    }
})

app.listen(port, function check(error) {
    if (error) {
        console.log("Error....!!!!");
    }
    else {
        console.log("Running on port " + port);
    }
});

/*=======================================================
                    Create Contact Data
=========================================================*/
app.post("/createContact", (req, res) => {
    let details = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNo: req.body.phoneNo,
    };
    let sql = "INSERT INTO contacts SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            res.send({ status: false, message: "Contact created Failed" });
        } else {
            res.send({ status: true, message: "Contact created successfully" });
        }
    });
});

/*=======================================================
                    Get All Contact Data
=========================================================*/

app.get("/getContacts", (req, res) => {
    var sql = "SELECT * FROM contacts";
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB");
        } else {
            res.send({ status: true, data: result });
        }
    });
});

/*=======================================================
                    Get Contact by ID
=========================================================*/

app.get("/getContact/:id", (req, res) => {
    var contactid = req.params.id;
    var sql = "SELECT * FROM contacts WHERE id=" + contactid;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB");
        } else {
            res.send({ status: true, data: result });
        }
    });
});

/*=======================================================
                    Update Contact
=========================================================*/
app.put("/updateContact/:id", (req, res) => {
    let sql =
        "UPDATE contacts SET firstName='" + req.body.firstName +
        "', lastName='" + req.body.lastName +
        "',phoneNo='" + req.body.phoneNo +
        "'  WHERE id=" + req.params.id;

    let a = db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Contact Updated Failed" });
        } else {
            res.send({ status: true, message: "Contact Updated successfully" });
        }
    });
});

/*=======================================================
                    Delete Contact
=========================================================*/
app.delete("/deleteContact/:id", (req, res) => {
    let sql = "DELETE FROM contacts WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Contact Deleted Failed" });
        } else {
            res.send({ status: true, message: "Contact Deleted successfully" });
        }
    });
});
