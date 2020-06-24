# ChicagoBrew 🍺
- [ChicagoBrew](https://chicagobrew.vercel.app/) is a fully responsive, server-side rendered web application that helps people in the Chicago area locate and enjoy the best breweries in town. 

# API Overiew 👩‍💻

```
/api
.
├── /brews
│   └── GET
|   └── POST
│   └── PUT
│       ├── /:item_id
│   └── DELETE
│       ├── /:item_id   
```

### POST `/api/brews`
```javascript
//req.body
{
    name: String
}

//res.body
{
    name: String
}
```

### GET `/api/brews`
```javascript
//req.body
[
    {
        name: String, 
        phone_number: String, 
        address: String,
        details: String,
        website: String
    }
]
```

### PUT `/api/brews/:brew_id`
```javascript
//req.body
{
        name: String, 
        phone_number: String, 
        address: String,
        details: String,
        website: String
}

//res.body
{
    [
        id: brew_id, 
        name: String, 
        phone_number: String, 
        address: String,
        details: String,
        website: String
    ]
}
```

### DELETE `/api/brews/:brew_id`
```javascript
//req.body
{
        name: String, 
        phone_number: String, 
        address: String,
        details: String,
        website: String
}

//res.body
{
    [
        id: brew_id, 
        name: String, 
        phone_number: String, 
        address: String,
        details: String,
        website: String
    ]
}
```

# Tech Used 🖥
- [Node](https://nodejs.org/en/) - Run-time environment
- [Express](https://expressjs.com/) - Web application framework
- [PostgreSQL](https://www.postgresql.org/) - Relational Database Management System
- [Mocha](https://mochajs.org/) - Testing
- [Chai](https://www.chaijs.com/) - Testing