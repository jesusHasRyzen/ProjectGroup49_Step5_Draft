// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static('public'))

PORT        = 9132;//9132                 // Set a port number at the top so it's easy to change in the future


const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.






// Database
var db = require('./database/db-connector')
/*
    ROUTES
*/
app.get('/', function(req, res)
    {

	let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

        	res.render('index', {data: rows});                    // Note the call to render() and not send(). Using render() ensures the templating engine
	})
	});

app.post('/add-person-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
	console.log(data)
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
  let deleteCustomer = `DELETE FROM Customers WHERE id = ?`;
  //let deleteBsg_People= `DELETE FROM bsg_people WHERE id = ?`;


        // Run the 1st query
        db.pool.query(deleteCustomer, [customer_ID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

           /* else
            {
                // Run the second query
                db.pool.query(deleteBsg_People, [personID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }*/
})});





/*app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
	var path = require('path');

        var filePath = path.resolve(__dirname, 'public/index.html');
        res.sendFile(filePath);
    });  // requesting the web site.
*/
     
    
          
/*
    LISTENER
*/
// app.use(express.static('./public'));

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
