-- create or replace command gives error uncomment the next 8 lines of code
-- SET FOREIGN_KEY_CHECKS=0; -- to disable them
-- Drop Table Customers;
-- Drop Table Employees;
-- Drop Table Inventory;
-- Drop Table Invoices;
-- Drop Table Models;
-- Drop Table Trims;
-- SET FOREIGN_KEY_CHECKS=1;-- to enable them

--SET FOREIGN_KEY_CHECKS=0;
--SET AUTOCOMMIT = 0;

-- creates Customers table with PK as customer_ID
CREATE OR REPLACE TABLE Customers (
  customer_ID INT AUTO_INCREMENT,
  customer_FirstName VARCHAR(45) NOT NULL,
  customer_LastName VARCHAR(45) NOT NULL,
  customer_Address VARCHAR(45) NOT NULL,
  customer_PhoneNumber VARCHAR(45) NOT NULL,
  customer_EmailAddress VARCHAR(45) NOT NULL,
  PRIMARY KEY (customer_ID)
  );
 
-- creates Employees table with PK as employee_ID
CREATE OR REPLACE TABLE Employees (
  employee_ID INT AUTO_INCREMENT,
  employee_FirstName VARCHAR(45) NOT NULL,
  employee_LastName VARCHAR(45) NOT NULL,
  employee_Address VARCHAR(45) NOT NULL,
  employee_PhoneNumber VARCHAR(45) NOT NULL,
  employee_EmailAddress VARCHAR(45) NOT NULL,
  PRIMARY KEY (employee_ID)
  );
  
-- creates Inventory table with PK as Inventory_Id
CREATE OR REPLACE Table Inventory (
  inventory_ID INT AUTO_INCREMENT,
  available_UnitsOnSite INT NOT NULL,
  available_UnitsForOrder INT NOT NULL,
  PRIMARY KEY (inventory_ID)
  );
  
-- creates Invoices table with PK as invoice_ID
-- has relationships to Customers and Emmployees tables to get each's ID from parent tables
CREATE OR REPLACE TABLE Invoices (
  invoice_ID INT AUTO_INCREMENT,
  employee_ID INT, -- Now it should be nullable and this is the attribute that makes the most sense to be nullable
  quantity INT NOT NULL,
  trim_ID INT NOT NULL,
  total_Price DECIMAL(10) NOT NULL,
  customer_ID INT NOT NULL,
  model_ID INT NOT NULL,
  PRIMARY KEY (invoice_ID),
  FOREIGN KEY(customer_ID) REFERENCES Customers(customer_ID)
  ON DELETE CASCADE,
    FOREIGN KEY(employee_ID) REFERENCES Employees(employee_ID)
  ON DELETE CASCADE
  );


   
 -- creates Models table with PK as model_ID
CREATE OR REPLACE TABLE Models (
  model_ID INT NOT NULL,
  model_Name VARCHAR(45) NOT NULL,
  model_Year INT NOT NULL,
  PRIMARY KEY (model_ID)
  );
  
-- creates Trims table with PK as trim_ID
-- has relationships to Models and Inventory tables to get each's ID from parent tables
-- in this case, the model_ID is assigned to models_Model
CREATE OR REPLACE TABLE Trims (
  trim_ID INT NOT NULL,
  trim_Name VARCHAR(45) NOT NULL,
  trim_Units INT NOT NULL,
  trim_MSRP INT NOT NULL,
  model_ID INT NOT NULL,
  inventory_ID INT NOT NULL,
  PRIMARY KEY (trim_ID, inventory_ID),
  FOREIGN KEY(model_ID) REFERENCES Models(model_ID)
  ON DELETE CASCADE,
  FOREIGN KEY(inventory_ID) references Inventory(inventory_ID)
  ON DELETE CASCADE
  );

CREATE OR REPLACE TABLE Invoices_Trims (
  invoice_ID INT NOT NULL,
  trim_ID INT NOT NULL,
  
  FOREIGN KEY (invoice_ID) REFERENCES Invoices(invoice_ID) ON DELETE CASCADE,
  FOREIGN KEY (trim_ID) REFERENCES Trims(trim_ID) 
  ON DELETE CASCADE
  );
    

  
CREATE OR REPLACE TABLE Models_Invoices (
  model_ID INT NOT NULL,
  invoice_ID INT NOT NULL,
  
  FOREIGN KEY (model_ID) REFERENCES Models(model_ID) ON DELETE CASCADE,
  FOREIGN KEY (invoice_ID) REFERENCES Invoices(invoice_ID) ON DELETE CASCADE
);

--- Alter tables with Cascade functionality

 
 
INSERT INTO Customers(customer_ID, customer_FirstName, customer_LastName, customer_Address, customer_PhoneNumber, customer_EmailAddress)
VALUES
(520, 'Jennifer', 'Microsoft', '2740 Kelley Road',	'318-265-0275',	'JenniferMicrosoft@email.com'),
(103, 'Juan',	'Netflix',	'4964 Carter Street',	'405-622-5875',	'JuanNetflix@email.com'),
(777, 'Q', 'Gnome',	'1939 Ritter Avenue',	'318-265-0278',	'QGnome@email.com'),
(900, 'Alice', 'Apple',	'1066 Davis Lane',	'405-622-5876',	'AliceApple@email.com'),
(109, 'Catherine',	'Yoda',	'4830 Straford Park',	'318-265-0276',	'CatherineYoda@email.com'),
(107, 'James',	'Prime',	'619 Tator Patch Road',	'405-622-5872',	'JamesPrime@email.com'),
(105, 'Jose',	'Hulu',	'3233 Ridenour Street',	'405-622-5874',	'JoseHulu@email.com'),
(730, 'M',	'Valentine',	'478 Lakeland Terrace',	'318-265-0279',	'MValentine@email.com'),
(111, 'Kenneth',	'Lights',	'4846 Polk Street',	'405-622-5873',	'KennethLights@email.com'),
(210, 'Tom',	'Sony',	'3573 Hott Street',	'318-265-0277',	'TomSony@email.com');

INSERT INTO Employees(employee_ID, employee_FirstName, employee_LastName, employee_Address, employee_PhoneNumber, employee_EmailAddress)
VALUES
(103,	'Juan',	'Netflix',	'2740 Kelley Road',	'405-622-5872',	'JuanNetflix@email.com'),
(105,	'Jose',	'Hulu',	'4964 Carter Street',	'318-265-0275',	'JoseHulu@email.com'),
(107,	'James',	'Prime',	'1939 Ritter Avenue',	'405-622-5873',	'JamesPrime@email.com'),
(109,	'Catherine',	'Yoda',	'1066 Davis Lane',	'318-265-0276',	'CatherineYoda@email.com'),
(111,	'Kenneth',	'Lights',	'4830 Straford Park',	'405-622-5874',	'KennethLights@email.com'),
(210,	'Tom',	'Sony',	'619 Tator Patch Road',	'318-265-0277',	'TomSony@email.com'),
(520,	'Jennifer',	'Microsoft',	'3233 Ridenour Street',	'405-622-5875',	'JenniferMicrosoft@email.com'),
(900,	'Alice',	'Apple',	'478 Lakeland Terrace',	'318-265-0278',	'AliceApple@email.com'),
(730,	'M',	'Valentine',	'478 Lakeland Terrace',	'405-622-5876',	'MValentine@email.com'),
(777,	'Q',	'Gnome',	'3573 Hott Street',	'318-265-0279',	'QGnome@email.com');

INSERT INTO Invoices(employee_ID, customer_ID, model_ID, trim_ID, quantity, total_Price)
VALUES
(210,	520,	17003,	70,	1,	43845.00),
(103,	109,	17001,	68,	1,	51040.00),
(103,	900,	17001,	70,	1,	43845.00),
(111,	109,	17003,	70,	1,	43845.00),
(210,	730,	17002,	69,	1,	46500.00),
(777,	105,	17003,	69,	1,	46500.00),
(777,	520,	17002,	70,	1,	43845.00);

INSERT INTO Models(model_ID, model_Year, model_Name)
VALUES
(17003,	2024,	'Giulia'),
(17002,	2024,	'Stelvio'),
(17001,	2024,	'Tonale'),
(17000,	2023,	'Giulia'),
(16999,	2023,	'Stelvio'),
(16998,	2023,	'Tonale'),
(16997,	2022,	'Giulia'),
(16996,	2022,	'Stelvio'),
(16995,	2022,	'Tonale'),
(16994,	2021,	'Giulia'),
(16993,	2021,	'Stelvio'),
(16992,	2021,	'Tonale');

INSERT INTO Inventory(inventory_ID, available_UnitsOnSite, available_UnitsForOrder)
VALUES
(999998,	22,	2),
(999997,	20,	2),
(999996,	20,	2),
(999995,	22,	4),
(999994,	25,	4),
(999993,	23,	3),
(999992,	21,	3),
(999991,	27,	3),
(999990,	24,	3),
(999989,	25,	2),
(999988,	27,	3),
(999987,	21,	4),
(999986,	24,	4),
(999985,	26,	4),
(999984,	23,	1),
(999983,	26,	2);

INSERT INTO Trims(trim_ID, trim_Name, trim_Units, trim_MSRP, models_Models, inventory_ID)
VALUES
(70,	'Sprint',	22,	43845,	17001, 999998),
(69,	'Ti',	20,	46500,	17001, 999998),
(68,	'Veloce',	25,	51040,	17001, 999998);

INSERT INTO Invoices_Trims(
invoice_ID,
trim_ID
)
VALUES
(SELECT invoice_ID FROM Invoices WHERE trim_ID = (SELECT trim_ID FROM Trims WHERE trim_Name = 'Sprint')),
(SELECT trim_ID FROM Trims WHERE trim_Name = 'Sprint');


INSERT INTO Models_Invoices(
model_ID,
invoice_ID
)
VALUES
(SELECT model_ID FROM Models WHERE model_Name = 'Giulia'),
(SELECT invoice_ID FROM Invoices WHERE invoice_ID = (select invoice_ID FROM Invoices Where model_Name = 'Giulia'));

-- Testing cascade capabilities.
SELECT * FROM Customers;
SELECT * FROM Employees;
SELECT * FROM Inventory;
SELECT * FROM Invoices;
-- select * from Invoices_Trims;

SELECT * FROM Models;
-- select * from Models_Invoices;
SELECT * FROM Trims;

DELETE FROM Employees where Employee_Id = 210;
SELECT * FROM Employees;
SELECT * FROM Invoices;

