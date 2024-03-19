

let updateInvoiceForm = document.getElementById('OpenupdateInvoice');

// Modify the objects we need
updateInvoiceForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();
    let tempid = updateInvoiceForm.elements[0].value;
    let customer = updateInvoiceForm.elements[1].value;
    let employee = updateInvoiceForm.elements[2].value;
    let quantity = updateInvoiceForm.elements[3].value;
    let model = updateInvoiceForm.elements[4].value;
    let trim = updateInvoiceForm.elements[5].value;
    let price = updateInvoiceForm.elements[6].value;
 
    if (isNaN(tempid)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        id: tempid,
        first_name: customer,
        last_name: employee,
        address: quantity,
        phone: model,
        email: trim,
        em: price

    };
    // updateRow(customerid);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update_invoice/", true);
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
            console.log("There was an error with the input Update_employee.js.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

function updateRow(tempData){
    let table = document.getElementById("Invoices-table");

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
            let tdem = updateRowIndex.getElementsByTagName("td")[6];
            
            // Reassign homeworld to our value we updated to
            tdfn.innerHTML = tempData.last_name; 
            tdln.innerHTML = tempData.address; 
            tdaddress.innerHTML = tempData.email; 
            tdphone.innerHTML = tempData.em; 
            tdemail.innerHTML = tempData.first_name;
            tdem.innerHTML = tempData.phone; 
       }
    }
}
