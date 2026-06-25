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

PUT {{uri}}/users
Authorization: Bearer {{access_token}}
{
  "name":"{{newUuid}}",
  "email": "{{user_email}}.br"
}
HTTP 200

POST {{uri}}/tokens
{
  "email": "{{user_email}}.br",
  "password": "{{user_password}}"
}
HTTP 200
[Captures]
access_token: jsonpath "$['access_token']"
[Asserts]
jsonpath "$.access_token" exists

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
email: jsonpath "$['email']"
password: jsonpath "$['password']"

POST {{uri}}/tokens
{
  "email": "{{email}}",
  "password": "{{password}}"
}
HTTP 200
[Captures]
token: jsonpath "$['access_token']"
[Asserts]
jsonpath "$.access_token" exists

DELETE {{uri}}/users
Authorization: Bearer {{token}}
HTTP 200

DELETE {{uri}}/users
Authorization: Bearer {{access_token}}
HTTP 200
