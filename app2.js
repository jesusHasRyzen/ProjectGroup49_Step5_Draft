// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static('public'))

PORT = 9134;//9132                 // Set a port number at the top so it's easy to change in the future


const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector')
/*
    ROUTES
*/

app.get('/style.css', (req, res) => {
    const cssContent = fetchStyleCssFromDatabase();
    res.setHeader('Content-Type', 'text/css');
    res.send(cssContent);
    });

app.get('/customers', function(req, res)
{

	let query1 = "SELECT * FROM Customers;";                        // Define our query

        db.pool.query(query1, function(error, rows, fields){        // Execute the query

        	res.render('index', {data: rows});                      // Note the call to render() and not send(). Using render() ensures the templating engine
	})
	})

app.get('/employees', function(req, res)
    {
        let query1 = "SELECT * FROM Employees;";                        // Define our query

        db.pool.query(query1, function(error, rows, fields){        // Execute the query

        	res.render('employees', {data: rows});                      // Note the call to render() and not send(). Using render() ensures the templating engine
	    })
    })

app.post('/add-employee-form', function(req, res){

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    
    query1 = `INSERT INTO Employees(employee_ID, employee_FirstName, employee_LastName, employee_Address, employee_PhoneNumber, employee_EmailAddress)
    VALUES('${data['input-id']}', '${data['input-fname']}' , '${data['input-lname']}', '${data['input-address']}', '${data['input-phone']}', '${data['input-email']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/employees');
        }
    })
})

app.delete('/delete-employee/', function(req,res,next){
    let data = req.body;
  
    let employee_ID = parseInt(data.id);
    let deleteEmployee = `DELETE FROM Employees WHERE employee_ID = ?`;
  //let deleteBsg_People= `DELETE FROM bsg_people WHERE id = ?`;
        // Run the 1st query
        db.pool.query(deleteEmployee, [employee_ID], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
                // Run the second query
                // db.pool.query(deleteBsg_People, [personID], function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                // })
            }
})});

app.put('/update_employee/', function(req,res,next){                                   
    
    let data = req.body;
    
    let employee_ID = parseInt(data.id);
    let employee_FirstName = data.first_name;
    let employee_LastName = data.last_name;
    let employee_Address = data.address;
    let employee_PhoneNumber = data.phone;
    let employee_EmailAddress = data.email;

    console.log(employee_ID);
    console.log(employee_FirstName);
    console.log(employee_LastName);
    console.log(employee_Address);
    console.log(employee_PhoneNumber);
    console.log(employee_EmailAddress);

    let queryUpdateEmployee = `UPDATE Employee 
    SET Employee = ? 
    WHERE Employees.employee_ID = ?`;

    queryUpdateEmployee = `UPDATE Employees SET employee_FirstName = ?, 
    employee_LastName = ?, employee_EmailAddress = ?, employee_PhoneNumber = ?, 
    employee_Address = ?
    WHERE employee_ID = ?`;

    let selectEmployees = `SELECT * FROM Employees WHERE employee_ID = ?`;
  
        //   Run the 1st query
          db.pool.query(queryUpdateEmployee, [employee_FirstName, employee_LastName, employee_EmailAddress, employee_PhoneNumber, employee_Address, employee_ID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              res.sendStatus(200);
  })
});


app.get('/inventory', function(req, res)
{

	let query1 = "SELECT * FROM Inventory;";                        // Define our query

        db.pool.query(query1, function(error, rows, fields){        // Execute the query

        	res.render('inventory', {data: rows});                      // Note the call to render() and not send(). Using render() ensures the templating engine
	})
});

app.post('/add-inventory-form', function(req, res){
    
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
	
    // Create the query and run it on the database
    console.log("insdie the post");
    query1 = `INSERT INTO Inventory(available_UnitsOnSite, available_UnitsForOrder)
	VALUES('${data['input-onsite']}', '${data['input-forOrder']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/inventory');
        }
    })
})

app.put('/update_inventory/', function(req,res,next){                                   
    
    let data = req.body;
    
    let inventory_ID = parseInt(data.id);
    let inventory_Name = data.name;
    let inventory_Units = data.units;
    let inventory_MSRP = data.msrp;
    // let employee_PhoneNumber = data.phone;
    // let employee_EmailAddress = data.email;

    console.log(inventory_ID);
    console.log(inventory_Name);
    console.log(inventory_Units);
    console.log(inventory_MSRP);
    // console.log(employee_PhoneNumber);
    // console.log(employee_EmailAddress);

    let queryUpdateInventory = `UPDATE Inventory 
    SET Inventory = ? 
    WHERE Inventory.inventory_ID = ?`;

    queryUpdateInventory = `UPDATE Inventory SET inventory_Name = ?, 
    inventory_Units = ?, inventory_MSRP = ?
    WHERE inventory_ID = ?`;

    let selectInventory = `SELECT * FROM Inventory WHERE employee_ID = ?`;
  
        //   Run the 1st query
          db.pool.query(queryUpdateInventory, [inventory_Name, inventory_Units, inventory_MSRP, inventory_ID ], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              res.sendStatus(200);
  })
});

app.delete('/delete-inventory/', function(req,res,next){
    let data = req.body;
  
    let inventory_ID = parseInt(data.id);
    let deleteInventory = `DELETE FROM Inventory WHERE inventory_ID = ?`;
  //let deleteBsg_People= `DELETE FROM bsg_people WHERE id = ?`;
        // Run the 1st query
        db.pool.query(deleteInventory, [inventory_ID], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
                // Run the second query
                // db.pool.query(deleteBsg_People, [personID], function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                // })
            }
})});

app.get('/invoices', function(req, res)
    {
        let query1 = "SELECT * FROM Invoices;";                        // Define our query

        db.pool.query(query1, function(error, rows, fields){        // Execute the query

        	res.render('invoices', {data: rows});                      // Note the call to render() and not send(). Using render() ensures the templating engine
	})
})

app.post('/add-invoice-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    
    query1 = `INSERT INTO Invoices(invoice_ID, customer_ID, employee_ID, quantity, model_ID, trim_ID, total_Price)
    VALUES('${data['input-iid']}', '${data['input-cid']}' , '${data['input-eid']}', '${data['input-quantity']}', '${data['input-mid']}', '${data['input-tid']}', '${data['input-price']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/invoices');
        }
    })
})

app.put('/update_invoice/', function(req,res,next){                                   
    
    let data = req.body;
    
    let invoice_ID = parseInt(data.id);
    let customer = data.first_name;
    let employee = data.last_name;
    let quantity = data.address;
    let model = data.phone;
    let trim = data.email;
    let price = data.em;

    console.log(invoice_ID);
    console.log(customer);
    console.log(employee);
    console.log(quantity);
    console.log(model);
    console.log(trim);
    console.log(price);

    let queryUpdateInvoice = `UPDATE Invoice 
    SET Invoice = ? 
    WHERE Invoices.invoice_ID = ?`;

    queryUpdateInvoice = `UPDATE Invoices SET employee_ID = ?, 
    quantity = ?, trim_ID = ?, total_Price = ?, 
    customer_ID = ?, model_ID = ? 
    WHERE invoice_ID = ?`;

    let selectInvoice = `SELECT * FROM Invoices WHERE invoice_ID = ?`;
  
        //   Run the 1st query
          db.pool.query(queryUpdateInvoice, [employee, quantity, trim, price, customer, model, invoice_ID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              res.sendStatus(200);
  })
});

app.delete('/delete-invoice/', function(req,res,next){
    let data = req.body;
  
    let invoice_ID = parseInt(data.id);
    let deleteInvoice = `DELETE FROM Invoices WHERE invoice_ID = ?`;
  //let deleteBsg_People= `DELETE FROM bsg_people WHERE id = ?`;
        // Run the 1st query
        db.pool.query(deleteInvoice, [invoice_ID], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
                // Run the second query
                // db.pool.query(deleteBsg_People, [personID], function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                // })
            }
})});



app.get('/models', function(req, res)
{
    let query1 = "SELECT * FROM Models;";                        // Define our query

    db.pool.query(query1, function(error, rows, fields){        // Execute the query

        res.render('models', {data: rows});                      // Note the call to render() and not send(). Using render() ensures the templating engine
})
})

app.post('/add-model-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    
    query1 = `INSERT INTO Models(model_ID, model_name, model_Year)
    VALUES('${data['input-mid']}', '${data['input-name']}' , '${data['input-year']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/models');
        }
    })
})

app.delete('/delete-model/', function(req,res,next){
    let data = req.body;
  
    let model_ID = parseInt(data.id);
    let deleteModel = `DELETE FROM Models WHERE model_ID = ?`;
  //let deleteBsg_People= `DELETE FROM bsg_people WHERE id = ?`;
        // Run the 1st query
        db.pool.query(deleteModel, [model_ID], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
                // Run the second query
                // db.pool.query(deleteBsg_People, [personID], function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                // })
            }
})});

app.put('/update_model/', function(req,res,next){                                   
    
    let data = req.body;
    
    let model_ID = parseInt(data.id);
    let model_Name = data.model_name;
    let model_Year = data.model_year;
    // let employee_Address = data.address;
    // let employee_PhoneNumber = data.phone;
    // let employee_EmailAddress = data.email;

    console.log(model_ID);
    console.log(model_Name);
    console.log(model_Year);
    // console.log(employee_Address);
    // console.log(employee_PhoneNumber);
    // console.log(employee_EmailAddress);

    let queryUpdateModel = `UPDATE Model 
    SET Model = ? 
    WHERE Models.model_ID = ?`;

    queryUpdateModel = `UPDATE Models SET model_Name = ?, 
    model_Year = ?
    WHERE model_ID = ?`;

    let selectModels = `SELECT * FROM Models WHERE model_ID = ?`;
  
        //   Run the 1st query
          db.pool.query(queryUpdateModel, [model_Name, model_Year, model_ID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              res.sendStatus(200);
  })
});


app.get('/trims', function(req, res)
    {
        let query1 = "SELECT * FROM Trims;";                        // Define our query

        db.pool.query(query1, function(error, rows, fields){        // Execute the query

        	res.render('trims', {data: rows});                      // Note the call to render() and not send(). Using render() ensures the templating engine
	})
})

app.post('/add-trim-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    
    query1 = `INSERT INTO Trims(trim_ID, trim_name, trim_Units, trim_MSRP, models_Models, inventory_ID)
    VALUES('${data['input-tid']}', '${data['input-name']}' , '${data['input-units']}', '${data['input-msrp']}', '${data['input-model']}', '${data['input-iid']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/trims');
        }
    })
})

app.delete('/delete-trim/', function(req,res,next){
    let data = req.body;
  
    let trim_ID = parseInt(data.id);
    let deleteTrim = `DELETE FROM Trims WHERE trim_ID = ?`;
  //let deleteBsg_People= `DELETE FROM bsg_people WHERE id = ?`;
        // Run the 1st query
        db.pool.query(deleteTrim, [trim_ID], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
                // Run the second query
                // db.pool.query(deleteBsg_People, [personID], function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                // })
            }
})});

app.put('/update_trim/', function(req,res,next){                                   
    
    let data = req.body;
    
    let trim_ID = parseInt(data.id);
    let trim_Name = data.name;
    let trim_Units = data.units;
    let trim_MSRP = data.msrp;
    let models_Models = data.model;
    let inventory_ID = data.iid;
    // let employee_Address = data.address;
    // let employee_PhoneNumber = data.phone;
    // let employee_EmailAddress = data.email;

    console.log(trim_ID);
    console.log(trim_Name);
    console.log(trim_Units);
    console.log(trim_MSRP);
    console.log(models_Models);
    console.log(inventory_ID);

    let queryUpdateModel = `UPDATE Trim 
    SET Trim = ? 
    WHERE Trims.trim_ID = ?`;

    queryUpdateTrim = `UPDATE Trims SET trim_Name = ?, 
    trim_Units = ?, trim_MSRP = ?, models_Models = ?, inventory_ID  = ?
    WHERE trim_ID = ?`;

    let selectTrims = `SELECT * FROM Trims WHERE trim_ID = ?`;
  
        //   Run the 1st query
          db.pool.query(queryUpdateTrim, [trim_Name, trim_Units, trim_MSRP, models_Models, inventory_ID, trim_ID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              res.sendStatus(200);
  })
});
//READ Customers
app.get('/', function(req, res)
    {

	let query1 = "SELECT * FROM Customers;";                        // Define our query

        db.pool.query(query1, function(error, rows, fields){        // Execute the query

        	res.render('index', {data: rows});                      // Note the call to render() and not send(). Using render() ensures the templating engine
	})
	});
 
//ADD Customers
app.post('/add-person-form', function(req, res){
    
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
	
    // Create the query and run it on the database
    
    query1 = `INSERT INTO Customers(customer_ID, customer_FirstName, customer_LastName, customer_Address, customer_PhoneNumber, customer_EmailAddress)
	VALUES('${data['input-id']}', '${data['input-fname']}' , '${data['input-lname']}', '${data['input-address']}', '${data['input-phone']}', '${data['input-email']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
})

app.delete('/delete-customer/', function(req,res,next){
    let data = req.body;
  
    let customer_ID = parseInt(data.id);
    let deleteCustomer = `DELETE FROM Customers WHERE customer_ID = ?`;
  //let deleteBsg_People= `DELETE FROM bsg_people WHERE id = ?`;
        // Run the 1st query
        db.pool.query(deleteCustomer, [customer_ID], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
                // Run the second query
                // db.pool.query(deleteBsg_People, [personID], function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                // })
            }
})});

app.put('/put-person-ajax/', function(req,res,next){                                   
    
    let data = req.body;

    let customer_ID = parseInt(data.id);
    let customer_FirstName = data.first_name;
    let customer_LastName = data.last_name;
    let customer_Address = data.address;
    let customer_PhoneNumber = data.phone;
    let customer_EmailAddress = data.email;

    console.log(customer_ID);
    console.log(customer_FirstName);
    console.log(customer_LastName);
    console.log(customer_Address);
    console.log(customer_PhoneNumber);
    console.log(customer_EmailAddress);

    let queryUpdateCustomer = `UPDATE Customer 
    SET Customer = ? 
    WHERE Customers.customer_ID = ?`;

    queryUpdateCustomer = `UPDATE Customers SET customer_FirstName = ?, 
    customer_LastName = ?, customer_EmailAddress = ?, customer_PhoneNumber = ?, 
    customer_Address = ?
    WHERE customer_ID = ?`;

    let selectCustomers = `SELECT * FROM Customers WHERE customer_ID = ?`;
  
        //   Run the 1st query
          db.pool.query(queryUpdateCustomer, [customer_FirstName, customer_LastName, customer_EmailAddress, customer_PhoneNumber, customer_Address, customer_ID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              res.sendStatus(200);
  })
});

    
          
/*
    LISTENER
*/
app.use(express.static('./public'));

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
 function updateCustomer() {
                document.getElementById("EditCustomer").style.display = "block";
            }