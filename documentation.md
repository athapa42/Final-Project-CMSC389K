
# Local Dogs for Adoption

---

Name: Sashank Thupukari

Date: April 2nd, 2017

Project Topic: Local Dogs for Adoption

URL: http://103.283.293.13:3000/
 ---

### 1. Data Format and Storage

Data point fields:
- `Field 1`: Name               `Type: String`
- `Field 2`: Breed              `Type: String`
- `Field 3`: Weight             `Type: Number`
- `Field 4`: Age                `Type: Number`
- `Field 5`: Characteristics    `Type: [String]`

Schema: 
```javascript
{
    name: String,
    breed: String,
    weight: Number, 
    age: Number,
    characteristics: [String]
}
```

### 2. Add New Data

HTML form route: `/addDog`

POST endpoint route: `/api/addDog`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/addDog',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
        name: 'Cupcake', 
        breed: 'German Shepherd',
        image: "http://i.imgur.com/iGLcfkN.jpg",
        age: 6
        characteristics: ["Brown", "Black", "Sleepy", "Lazy"]
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/...`

### 4. Search Data

Search Field: `name`

### 5. Navigation Pages

Navigation Filters
1. To Add new Post-> `/addPost`
2. videos, articles and opinies about Sport -> `/sport`
3. People asking about courses, -> `/academic`
4. Research -> `/research`
5. Activity Happing at UMD -> `/event`
6. On/off campus Job Post/Review -> `/career`
7. Chat with Random Student -> `/chat`
8. About Us -> `/aboutUs`
