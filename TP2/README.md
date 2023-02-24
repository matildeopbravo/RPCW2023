# Setting Up
### Generate XML and HTML files
```sh
python generate_pages.py
```

### Run server
```sh
node server.js
```
# API
### Index Page of all Archaelogical Sites
`GET /`

### HTML page for Archaelogical Site
`GET /html/:id`

### XML page for Archaelogical Site
`GET /xml/:id`