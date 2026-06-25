POST {{uri}}/users/store
{
  "name":"{{newUuid}}",
  "surname": "{{newUuid}}",
  "email": "{{newUuid}}@test.com",
  "password": "0123456789"
}
HTTP 200
[Captures]
user_id: jsonpath "$['id']"
user_email: jsonpath "$['email']"
user_password: jsonpath "$['password']"

POST {{uri}}/users/store
{
  "name":"{{newUuid}}",
  "surname": "{{newUuid}}",
  "email": "{{user_email}}",
  "password": "0123456789"
}
HTTP 400
[Asserts]
jsonpath "$.errors[0]" contains "Email already exists"

POST {{uri}}/tokens
{
  "email": "{{user_email}}",
  "password": "{{user_password}}"
}
HTTP 200
[Captures]
access_token: jsonpath "$['access_token']"
[Asserts]
jsonpath "$.access_token" exists

GET {{uri}}/users
Authorization: Bearer {{access_token}}
HTTP 200

GET {{uri}}/users/{{user_id}}
HTTP 200

PUT {{uri}}/users/{{user_id}}
Authorization: Bearer {{access_token}}
{
  "name":"{{newUuid}}",
  "password": "0123456789"
}
HTTP 200

POST {{uri}}/users/store
{
  "name":"{{newUuid}}",
  "surname": "{{newUuid}}",
  "email": "{{newUuid}}@test.com",
  "password": "0123456789"
}
HTTP 200
[Captures]
id: jsonpath "$['id']"

DELETE {{uri}}/users/{{id}}
Authorization: Bearer {{access_token}}
HTTP 401

DELETE {{uri}}/users/{{user_id}}
Authorization: Bearer {{access_token}}
HTTP 200
