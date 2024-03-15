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
app.get('/customers', function(req, res)
    {
        res.render('customers');
    })

app.get('/employees', function(req, res)
    {
        let query1 = "SELECT * FROM Employees;";                        // Define our query

        db.pool.query(query1, function(error, rows, fields){        // Execute the query

        	res.render('employees', {data: rows});                      // Note the call to render() and not send(). Using render() ensures the templating engine
	})
    })
    app.get('/inventory', function(req, res)
    {
        res.render('inventory');
    })

app.get('/invoices', function(req, res)
    {
        let query1 = "SELECT * FROM Invoices;";                        // Define our query

        db.pool.query(query1, function(error, rows, fields){        // Execute the query

        	res.render('invoices', {data: rows});                      // Note the call to render() and not send(). Using render() ensures the templating engine
	})
    })
    app.get('/models', function(req, res)
    {
        let query1 = "SELECT * FROM Models;";                        // Define our query

        db.pool.query(query1, function(error, rows, fields){        // Execute the query

        	res.render('models', {data: rows});                      // Note the call to render() and not send(). Using render() ensures the templating engine
	})
    })

app.get('/trims', function(req, res)
    {
        let query1 = "SELECT * FROM Trims;";                        // Define our query

        db.pool.query(query1, function(error, rows, fields){        // Execute the query

        	res.render('trims', {data: rows});                      // Note the call to render() and not send(). Using render() ensures the templating engine
	})
    })

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

    // res.sendStatus(200);

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
  
            //   If there was no error, we run our second query and return that data so we can use it to update the people's
            //   table on the front-end
            //    else
            //    {
            // Run the second query
            //   db.pool.query(selectCustomers, [customer_ID], function(error, rows, fields) {
          
            //           if (error) {
            //                console.log(error);
            //               res.sendStatus(400);
            //           } else {
            //                res.send(rows);
            //            }
            //        })
            //    }
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