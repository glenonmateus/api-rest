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
