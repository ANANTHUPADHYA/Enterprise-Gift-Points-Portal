### University Name: http://www.sjsu.edu/

### Course: CMPE-272, Enterprise Software Platforms

### Professor: Andrew H. Bond

### Team Members
   ###### ANANTH UPADHYA
   ###### DEESHA DESAI
   ###### PREETI PARIHAR
   ###### PRIYANKA DEVENDRAN
   
### Project Introduction
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

### Sample Demo Screenshots
APIs

* Requirements:

    set following environment variables values:

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

    ```pip3 install -r requirements.txt```

    ```python3 flask_app.py```

* Create new user on terminal

```
    echo -n sampleuser@gmail.com:@SampleUser1234 | base64
```
Output
```
c2FtcGxldXNlckBnbWFpbC5jb206QFNhbXBsZVVzZXIxMjM0
```


1. ```http://<host-name>/account/signin```

    Request:
        * Add Authorization Header as follows:
        ```Authorization: Basic <Base64 username:password>```

    Response:
        ```{
            "status": 200,
            "success": false,
            "data": {
                    "accessToken": <access_token>,
                    "profile":{
                        <user profile data>
                    }
            }
        }```

2. ```http://<host-name>/account/signup```

    Request:
        * Add Authorization Header as follows:
        ```Authorization: Basic <Base64 username:password>```
        * Request Body
            <Pass request body in json as discussed>

            * Sample Data
        ```
        {
            "email": "david@gmail.com",
            "admin": "true",
            "firstName": "David",
            "lastName": "Jhon",
            "yoyoPoints": "1000"
        }
        ```



3. ```http://<host-name>/account/signout```

    Pass access token obtain while signing in as Bearer token in request header
    Request:
        * Add Authorization Header as follows:
        ```Authorization: Bearer <access token>```


4. ```http://<host-name>/account/profile```

    Request:
        * Pass access token obtain while signing in as Bearer token in request header
        * Pass usertype in path parameter
        
            * Add Authorization Header as follows:
            ```Authorization: Bearer <access token>```
        * Body: pass request body in json, make sure keyname are matching as discussed
    


* Sample Data
```
{
   
    "yoyoPoints": "2000"
}
```
