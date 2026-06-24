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

DELETE {{uri}}/users/{{user_id}}
HTTP 200
