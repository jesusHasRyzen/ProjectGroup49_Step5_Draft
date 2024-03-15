
-- Inserts Customer into the database
INSERT INTO Customers (customer_FirstName, customer_LastName, customer_Address, customer_PhoneNumber, customer_EmailAddress)
VALUES ( :customerFirstName_Input, :customerLastName_Input, :customerAddress_Input, :phoneNumber_Input, :emailAddress_Input);

-- Inserts Employee into the database
INSERT INTO Employees (employee_FirstName, employee_LastName, employee_Address, employee_PhoneNumber, employee_EmailAddress)
VALUES (:employeefirstName_Input, :employeeLastName_Input, :employeeAddress_Input, :phoneNumber_Input, :emailAddress_Input);


-- Inserts Inventory information into the database
INSERT INTO Inventory (available_UnitsForOrder, available_UnitsOnSite)
VALUES (:unitsOnSite_Input, :unitsForOrder_Input);


-- Insert Invoice into the database
INSERT INTO Invoices (quantity, total_Price, invoice_ID)
VALUES (:quantity_Input, :price_Input, invoiceID_Input);


-- Insert models into the database
INSERT INTO Models (model_ID, model_Name, model_Year)
VALUES (:modelID_Input,:model_Input, :modelYear_Input);

--Insert trims into the database
INSERT INTO Trims (trim_ID, trim_Name, trim_Units, trim_MSRP)
VALUES (:trimID_Input,:trim_Input, :units_Input, :MSRP_Input);

--Insert into intersection tables
INSERT INTO Invoices_Trims (invoice_ID, trim_ID) VALUES (:invoiceID_Input, :trimID_Input)
INSERT INTO Models_Invoices (model_ID, invoice_ID) VALUES (:modelID_Input, :invoiceID_Input)




-- Delete a Customer 
DELETE FROM Customers
WHERE customerID = :customer_ID;


-- Delete a Trim 
DELETE FROM Trims
WHERE trim_ID =: trim_ID;


-- Delete an employee
DELETE FROM Employee
WHERE employee_ID =: employee_ID;


-- Edit a Customer
UPDATE Customers
SET customer_FirstName = :customerFirstName_Input, customer_LastName = :customerLastName_Input, customer_EmailAddress = :emailAddress_Input, customer_PhoneNumber = :phoneNumber_Input, customer_Address = :customerAddress_Input
WHERE customerID = :customer_ID;


-- Edit a Trim
UPDATE Trims
SET trim_Name = :trim_Input, trim_Units = :units_Input, trim_MSRP = :MSRP_Input
WHERE trim_ID = :trim_ID;

--Edit inventory numbers
UPDATE Inventory
SET available_UnitsOnSite = :unitsOnSite_Input, available_UnitsForOrder =unitsForOrder_Input
WHERE inventory_ID =: inventory_ID

-- Search for a Customer by name
SELECT * FROM Customers
WHERE customer_FirstName = :customerFirstName_Input AND customer_LastName = :customerLastName_Input;

-- Search for models
SELECT * FROM Models
WHERE model_Name = :model_Input;


-- Search for invoices by invoice ID
SELECT * FROM Invoices
WHERE invoice_ID = :invoiceID_Input;


-- Search for an Employee by name
SELECT * FROM Employees
WHERE employee_FirstName = :employeefirstName_Input AND employee_LastName = :employeeLastName_Input;


