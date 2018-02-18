
# parse-birthdates

```javascript
const parse = require('@datagica/parse-birthdates')
await parse('age: 77 years old')
```

will output:

```javascript
[
      {
        "ngram": "age: 77",
        "value": {
          "id": "birthdate-1941",
          "label": {
            "en": "Wed Jan 01 1941 00:00:00 GMT+0100 (CET)"
          },
          "timestamp": -915152400000,
          "month": 1,
          "date": 1,
          "year": 1941,
          "age": 77,
          "keywords": {
            "en": [
              "birthday",
              "birth date",
              "age"
            ],
            "fr": [
              "âge",
              "date de naissance"
            ]
          }
        },
        "score": 1,
        "position": {
          "sentence": 0,
          "word": 2,
          "begin": 7,
          "end": 14
        }
      }
    ]
```