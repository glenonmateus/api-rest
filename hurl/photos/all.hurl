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
student_email: jsonpath "$['email']"
student_id: jsonpath "$['id']"

POST {{uri}}/photos
[Multipart]
photo: file,images.jpg;
HTTP 200

POST {{uri}}/photos
[Multipart]
photo: file,script.sh;
HTTP 400
[Asserts]
jsonpath "$.errors[0]" == "File not supported"

POST {{uri}}/photos
[Multipart]
student_id: {{student_id}}
photo: file,images.jpg;
HTTP 200

POST {{uri}}/photos
[Multipart]
student_id: {{newUuid}}
photo: file,images.jpg;
HTTP 400

DELETE {{uri}}/students/{{student_id}}
Authorization: Bearer {{access_token}}
HTTP 200

DELETE {{uri}}/users
Authorization: Bearer {{access_token}}
HTTP 200
