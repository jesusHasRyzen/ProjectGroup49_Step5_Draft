

let updateTrimForm = document.getElementById('OpenupdateTrim');

// Modify the objects we need
updateTrimForm.addEventListener("submit", function (e) {
    console.log("inside the js file");
    // Prevent the form from submitting
    e.preventDefault();
    let tempid = updateTrimForm.elements[0].value;
    let tempname = updateTrimForm.elements[1].value;
    let tempunits = updateTrimForm.elements[2].value;
    let tempmsrp = updateTrimForm.elements[3].value;
    let tempmodel = updateTrimForm.elements[4].value;
    let tempiid = updateTrimForm.elements[5].value;
    if (isNaN(tempid)) 
    {
        return;
    }
    console.log(tempid);
    // Put our data we want to send in a javascript object
    let data = {
        id: tempid,
        name: tempname,
        units: tempunits,
        msrp: tempmsrp,
        model: tempmodel,
        iid: tempiid
    };
    // updateRow(customerid);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update_trim/", true);
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
            console.log("There was an error with the input Update_model.js.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

function updateRow(tempData){
    let table = document.getElementById("Trims-table");

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
            tdfn.innerHTML = tempData.name; 
            tdln.innerHTML = tempData.units; 
            tdaddress.innerHTML = tempData.msrp; 
            tdphone.innerHTML = tempData.model; 
            tdemail.innerHTML = tempData.iid; 
       }
    }
}
