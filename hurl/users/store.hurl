POST {{uri}}/users/store
{
  "name":"Test",
  "surname": "Test",
  "email": "{{newUuid}}@test.com",
  "password": "0123456789"
}
HTTP 200
