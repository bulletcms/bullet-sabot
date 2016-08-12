# API

## Pages

GET /pages/page-name

response:
```json
{
  "title": "Page Name",
  "tags": ["tag-1", "tag-2"],
  "content": ["<bulletmark here>"]
}
```

POST | PUT | DELETE /pages/page-name

request:
```json
{
  "username": "<username>",
  "idToken": "<id_token>",
  "title": "Page Name",
  "tags": ["tag-1", "tag-2"],
  "content": ["<bulletmark here>"]
}
```

response:
```json
{
  "title": "Page Name",
  "status": "<true | false>"
}
```
