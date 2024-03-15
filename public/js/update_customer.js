

// Get the objects we need to modify
// let updatePersonForm = document.getElementById('update-customer-form-ajax');

let updateCustomerForm = document.getElementById('OpenupdateCustomer');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();
    let tempid = updateCustomerForm.elements[0].value;
    let tempfirstname = updateCustomerForm.elements[1].value;
    let templastname = updateCustomerForm.elements[2].value;
    let tempaddress = updateCustomerForm.elements[3].value;
    let tempnumnber = updateCustomerForm.elements[4].value;
    let tempemail = updateCustomerForm.elements[5].value;
    // Get form fields we need to get data from
    // let inputCustomerID = document.getElementById("selected-customer-id");
    // console.log(tempid);
    // console.log(tempfirstname);
    // console.log(templastname);
    // console.log(tempaddress);
    // console.log(tempnumnber);
    // console.log(tempemail);    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(tempid)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        id: tempid,
        first_name: tempfirstname,
        last_name: templastname,
        address: tempaddress,
        phone: tempnumnber,
        email: tempemail
    };
    // updateRow(customerid);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-person-ajax/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        console.log(xhttp.status);
        console.log(xhttp.readyState);
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(data)

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input Update_customer.js.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

function updateRow(tempData){
    let table = document.getElementById("Customer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == tempData.id) {
            
            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            
            // Get td of homeworld value
            let tdfn = updateRowIndex.getElementsByTagName("td")[1];
            let tdln = updateRowIndex.getElementsByTagName("td")[2];
            let tdaddress = updateRowIndex.getElementsByTagName("td")[3];
            let tdphone = updateRowIndex.getElementsByTagName("td")[4];
            let tdemail = updateRowIndex.getElementsByTagName("td")[5];
            // Reassign homeworld to our value we updated to
            tdfn.innerHTML = tempData.first_name; 
            tdln.innerHTML = tempData.last_name; 
            tdaddress.innerHTML = tempData.address; 
            tdphone.innerHTML = tempData.phone; 
            tdemail.innerHTML = tempData.email; 
       }
    }
}
