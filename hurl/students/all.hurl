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

POST {{uri}}/students/store
{
  "name": "{{newUuid}}",
  "surname": "{{newUuid}}",
  "email": "{{newUuid}}@test.com",
  "age": 20,
  "weight": 100,
  "height": 1.80
}
HTTP 401

POST {{uri}}/students/store
Authorization: Bearer {{access_token}}
{
  "name": "{{newUuid}}",
  "surname": "{{newUuid}}",
  "email": "{{newUuid}}@test.com",
  "age": 20,
  "weight": 100,
  "height": 1.80
}
HTTP 200
[Captures]
student_email1: jsonpath "$['email']"
student_id1: jsonpath "$['id']"

POST {{uri}}/students/store
Authorization: Bearer {{access_token}}
{
  "name": "{{newUuid}}",
  "surname": "{{newUuid}}",
  "email": "{{newUuid}}@test.com",
  "age": 20,
  "weight": 100,
  "height": 1.80
}
HTTP 200
[Captures]
student_email2: jsonpath "$['email']"
student_id2: jsonpath "$['id']"

POST {{uri}}/students/store
Authorization: Bearer {{access_token}}
{
  "name": "{{newUuid}}",
  "surname": "{{newUuid}}",
  "email": "{{student_email1}}",
  "age": 20,
  "weight": 100,
  "height": 1.80
}
HTTP 400
[Asserts]
jsonpath "$.errors[0]" contains "Email already exists"

GET {{uri}}/students
HTTP 200
[Asserts]
jsonpath "$.*" count > 0

GET {{uri}}/students/{{student_id1}}
HTTP 200

PUT {{uri}}/students/{{student_id1}}
{
  "name": "{{newUuid}}",
  "age": 30
}
HTTP 401

PUT {{uri}}/students/{{student_id1}}
Authorization: Bearer {{access_token}}
{
  "name": "{{newUuid}}",
  "age": 30
}
HTTP 200

PUT {{uri}}/students/{{newUuid}}
Authorization: Bearer {{access_token}}
{
  "name": "{{newUuid}}",
  "age": 30
}
HTTP 404

DELETE {{uri}}/students/{{student_id1}}
HTTP 401

DELETE {{uri}}/students/{{newUuid}}
Authorization: Bearer {{access_token}}
HTTP 404

DELETE {{uri}}/students/{{student_id1}}
Authorization: Bearer {{access_token}}
HTTP 200

DELETE {{uri}}/students/{{student_id2}}
Authorization: Bearer {{access_token}}
HTTP 200

DELETE {{uri}}/users
Authorization: Bearer {{access_token}}
HTTP 200
