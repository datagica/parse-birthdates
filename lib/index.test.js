
const parse = require("./index")

// const calculateAge = require('./calculateAge')

const tests = [
  {
    input: "age: 18 anos",
    output: [
      {
        "ngram": "age: 18",
        "value": {
          "id": "birthday-2000",
          "label": {
            "en": "Sat Jan 01 2000 00:00:00 GMT+0100 (CET)"
          },
          "timestamp": 946681200000,
          "month": 1,
          "date": 1,
          "year": 2000,
          "age": 18,
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
  },
  {
    input: "age: 35 ans",
    output: [
      {
        "ngram": "age: 35",
        "value": {
          "id": "birthday-1983",
          "label": {
            "en": "Sat Jan 01 1983 00:00:00 GMT+0100 (CET)"
          },
          "timestamp": 410223600000,
          "month": 1,
          "date": 1,
          "year": 1983,
          "age": 35,
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
  },
  {
    input: "age: 77 years old",
    output: [
      {
        "ngram": "age: 77",
        "value": {
          "id": "birthday-1941",
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
  },

  // TODO - doesn't work yet
  {
    input: "date de naissance: 1 avril 1985",
    output: []
  }
]

 test('should extract birthdays', async () => {
    for (let i = 0; i < tests.length; i++) {
      const output = await parse(tests[i].input)
      console.log('output: ' + JSON.stringify(output, null, 2))
      expect(output).toEqual(tests[i].output)
    }
 })