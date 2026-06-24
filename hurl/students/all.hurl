POST {{uri}}/students/store
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
email: jsonpath "$['email']"
student_id: jsonpath "$['id']"

POST {{uri}}/students/store
{
  "name": "{{newUuid}}",
  "surname": "{{newUuid}}",
  "email": "{{newUuid}}@test.com",
  "age": 20,
  "weight": 100,
  "height": 1.80
}
HTTP 200

GET {{uri}}/students
HTTP 200
[Asserts]
jsonpath "$.*" count > 0

GET {{uri}}/students/{{student_id}}
HTTP 200

PUT {{uri}}/students/{{student_id}}
{
  "name": "{{newUuid}}",
  "age": 30
}
HTTP 200

DELETE {{uri}}/students/{{student_id}}
HTTP 200
