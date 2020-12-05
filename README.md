
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
