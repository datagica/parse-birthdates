
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
          "id": "birthdate-1941-02-01",
          "label": {
            "en": "1941-02-01"
          },
          "date": "1941-02-01",
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