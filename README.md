SWAN _ TASK

Total 3 microservices(MS) are cretaed in one parent S_Task Repo
MS-1 is implemented for login and jwt token authentication it will sync with MS-2 and MS-3 by REST
MS-1 is running on port 5001

MS-2 is implemented for creating the user 
MS-2 is working on port 5011

MS-3 is implemented for creating the products by admin and review to the product by client 
MS-3 is working on port 5021

For installation and execution 
    1. Install Mongodb or make platform to connect with mongodb
    2. Install node and nodemon
    3. In every MS execute cli with npm install
    4. In every MS execute cli with npm start
    
In Database there are 3 collections are created
table 1 user: this collection consists the user details and defines the role of the user, this privilage is given to the admin user.
table 2 product: this collection consists the product details where admin user can add the product.
table 3 product_review: this collection is associated with the product where the client user can give review to the product.

