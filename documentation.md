
# Reddit for people affiliated with UMD

---

Name: Nahom Tesfatsion, Aavash Thapa

Date: December 6, 2019

Project Topic: Reddit for people affiliated with UMD

URL: umdreddit.herokuapp.com
 ---

### 1. Data Format and Storage

Data point fields:
- `Field 1`: Category           `Type: String`
- `Field 2`: Title              `Type: String`
- `Field 3`: Description        `Type: String`
- `Field 4`: Link               `Type: URL`
- `Field 5`: Image              `Type: URL`
- `Field 6`: Name               `Type: String`

Schema:
```javascript
{
    category: String,
    title: String,
    description: Number,
    link: URL,
    image: URL,
    name: String
}
```

### 2. Add New Data

HTML form route: `/addPost`


Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/addPost',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        category: 'Sport',
        breed: 'UMD Football sucks',
        description: "UMD football will always dissapoint"
        link: "https://www.baltimoresun.com/sports/terps/bs-sp-maryland-football-takeaways-nebraska-20191124-yehy2bg4djaodppllpi2pwexde-story.html"
        image: "https://www.washingtonpost.com/resizer/iHTDE5g1mC4unsd3IrxYWsJIAeI=/767x0/smart/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/MU7WEQWXFMI6TCJEDW35VR4X7M.jpg",
        name: Ron Howard
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```


### 4. Search Data

Search Field: `title`

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
