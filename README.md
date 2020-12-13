### University Name: http://www.sjsu.edu/

### Course: CMPE-272, Enterprise Software Platforms

### Professor: Andrew H. Bond

###### Team Members
   ###### ANANTH UPADHYA (015234726)
   ###### DEESHA DESAI (015135536)
   ###### PREETI PARIHAR (015218073)
   ###### PRIYANKA DEVENDRAN (015231411)
   
###### Project Introduction
Gifts Gallery is a portal where the user can purchase e-Gift cards across multiple categories and brand. Gift cards have a huge and effective way to increase profits and are also considered a nearly essential option for businesses to provide. Gift Gallery cards work in similar way to that of regular gift card for in store or online shopping. In our portal we send the gifts gallery cards which can be purchased through points, to the recipient email along with the card code.
In our website the customers can register and purchase gift coupons from multiple brands online, either for themselves or can send it as gift to friends and family with a personalized message. In corporate world, managers, people leaders can reward their employees for their hard work through Gift Gallery points.


 ###### Feature List:
  
      1.ADMIN
        * Add a new product
        * Delete the product
        * Edit the product
        * Add new category
        * Delete Category
        * Edit Category
        * All the features offered to a customer will be offered to admin as well.
       2. COSTUMER
        * View all the products
        * Add a product to cart and checkout with personalized message sent in an email along with gift code.
        * Filter products by category & name. Sort by price.
        * Tweet about the product
        * Read recent tweets made by customers.

       
###### Architecture Diagram
![Architecture](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Architecture.png)



###### UML Diagram
![UML Diagram](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/UML%20diagram.png)

###### Technology Stack
      Python3-Flask
      Python3-Django
      NodeJS
      Angular
      Bootstrap
      SCSS
      HTML
      Angular material
      Mongo DB
      AWS Services
      Docker


### Pre-Requistes 

    Set following environment variables values:

    ```
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", None)
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", None)
    AWS_REGION = os.getenv("AWS_REGION", None)
    COGNITO_USER_POOL_ID = os.getenv("COGNITO_USER_POOL_ID", None)
    COGNITO_APP_CLIENT_ID = os.getenv("COGNITO_APP_CLIENT_ID", None)
    S3_BUCKET = os.getenv("S3_BUCKET", None)
    S3_URL = os.getenv("S3_BUCKET", None)
    CLOUD_FRONT_URL = os.getenv("CLOUD_FRONT_URL", None)
    ```
    
    ```
    Install Node.js -Version 12 https://nodejs.org/en/
    ```
    
  ### Steps for Local Set-up:
    
    *  For Authentication & Authorization service, Do the following inside accounts folder
    
 
    ```pip3 install -r requirements.txt```

    ```python3 flask_app.py```
    
    *For twitter service :
    
    ```create a '.env' file in path '/twitterService/twitterService'. Retrieve all consumer & access keys from twitter developer account and paste it in the .env          file as follows.
    
      CONSUMER_KEY='Consumer key' 
      CONSUMER_SECRET='Consumer secret' 
      ACCESS_KEY='Access key' 
      ACCESS_SECRET='Access secret'
    ```
    
    ```
    To Run Django application, run following command under folder 'twitterService':
    
    python manage.py runserver
    ```
    
    
    * For Node server, run following commands inside Server folder:
    
    ```
    npm install
    npm start
    ```
    
    
    * For front-end server, do the following in UI folder:
    
     ```npm install -g @angular/cli```
     ```npm install```
     ```ng serve```
      Server will be running on ‘http://localhost:4200’ 


###### Demo Screenshots
### Login Page
![Login Page](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Login%20Page.png)

#### Register Page
![Register Page](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Register%20page.png)

### Home Page
![Home Page](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Home%20Page.png)
### Home Page Filters
![Home Page](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Home%20page%20filters.png))
### Cart Page
![Cart Page](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Cart%20Page.png)
### Checkout Page
![Checkout Page](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Checkout.png)
### Reviews Page
![Reviews](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Reviews.png)
### Add review Page
![Add review](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Add%20review.png)
### After adding review
![After addding review](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/After%20addding%20review.png)
### Login Page
![UML Diagram](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Login%20Page.png)
### Admin Home Page
![Admin Home ](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Admin%20home.png)
### Categories Page
![Categories](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Categories.png)
### Add Category Page
![Admin Home ](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Add%20categories.png)
### Admin Products Page
![Admin Home ](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Admin%20Prodcuts.png)
### Add Product Page
![Add Product ](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/Add%20Product.png)

### Triggered Email
![Email ](https://github.com/ANANTHUPADHYA/Enterprise-Gift-Points-Portal/blob/main/screenshots/email.png)

