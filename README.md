# CORS Repeater

This is a system designed to act as a proxy so that APIs that don't support CORS Preflight Requests can be used in modern JavaScript applications without modifying the API server. This is useful when you're using a 3rd party API and have no control over the server.

It accepts a `POST` request containing the following JSON body:

```json
{
    "url": "https://some-non-cors-enabled-api.com/",
    "method": "GET",
    "data": {}
}
```

It will attempt to make a request to the `url` using the `method` along with the `data` specified and return the response as JSON with the required Cross-Origin headers.

It also accepts an `OPTIONS` request and returns a 200 status with the correct headers.

# Manual AWS Setup

1. Create a new Lambda function with the name of your choice using Node.js 8 and a new or existing role and paste the contents of `index.js` into the Function Code input area.
2. Go to the Amazon API Gateway section of the AWS Console and create a New API with the name of your choice.
3. From the Actions dropdown, select 'Create Method', choose 'POST' and save.
4. In the resulting endpoint config page, choose 'Lambda Function' as the integration type, leave 'Use Lambda Proxy integration' unchecked, select your Lambda function and save.
5. From the Actions dropdown, select 'Enable CORS' and then click the button to confirm
6. Unfortunately, this doesn't add all the CORS headers to the POST endpoint so from the menu on the left, click POST and then click the 'Method Response' box.
7. Click the toggle on the 200 response and add two more headers: `Access-Control-Allow-Headers` and `Access-Control-Allow-Methods`
8. Go back to the Method Execution/POST screen and click the 'Integration Response' box.
9. Toggle the 200 response and then the Header Mappings and add `'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'` to the `Access-Control-Allow-Headers` header and `'POST,OPTIONS'` to the `Access-Control-Allow-Methods` header.
10. From the Actions dropdown, select 'Deploy API', select 'New Stage' and give it a name (e.g. 'production' or 'beta').

This will give you an endpoint. Make a `POST` request to it with the above JSON body and you're done.

@todo Write CLI instructions
