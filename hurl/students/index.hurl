GET {{uri}}/students
HTTP 200
[Asserts]
jsonpath "$.*" count > 0
