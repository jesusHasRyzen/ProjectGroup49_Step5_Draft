

let updateEmployeeForm = document.getElementById('OpenupdateEmployee');

// Modify the objects we need
updateEmployeeForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();
    let tempid = updateEmployeeForm.elements[0].value;
    let tempfirstname = updateEmployeeForm.elements[1].value;
    let templastname = updateEmployeeForm.elements[2].value;
    let tempaddress = updateEmployeeForm.elements[3].value;
    let tempnumnber = updateEmployeeForm.elements[4].value;
    let tempemail = updateEmployeeForm.elements[5].value;
 
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
    xhttp.open("PUT", "/update_employee/", true);
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
    let table = document.getElementById("Employee-table");

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
