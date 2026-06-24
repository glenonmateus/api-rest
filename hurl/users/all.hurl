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

GET {{uri}}/users
HTTP 200

GET {{uri}}/users/{{user_id}}
HTTP 200

PUT {{uri}}/users/{{user_id}}
{
  "name":"{{newUuid}}",
  "password": "0123456789"
}
HTTP 200

DELETE {{uri}}/users/{{user_id}}
HTTP 200
