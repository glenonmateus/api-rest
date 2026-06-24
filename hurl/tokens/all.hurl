POST {{uri}}/users/store
{
  "name":"{{newUuid}}",
  "surname": "{{newUuid}}",
  "email": "{{newUuid}}@test.com",
  "password": "0123456789"
}
HTTP 200
[Captures]
user_email: jsonpath "$['email']"
user_id: jsonpath "$['id']"

POST {{uri}}/tokens
{
    "email": "{{user_email}}",
    "password": "0123456789"
}
HTTP 200
[Asserts]
jsonpath "$.access_token" exists

DELETE {{uri}}/users/{{user_id}}
HTTP 200
