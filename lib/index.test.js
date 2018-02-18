
const parse = require("./index")

// const calculateAge = require('./calculateAge')

const tests = [
  {
    input: "age: 18 anos",
    output: [
      {
        "ngram": "age: 18",
        "value": {
          "id": "birthdate-2000-02-01",
          "label": {
            "en": "2000-02-01"
          },
          "date":"2000-02-01",
          "age": 18,
          "keywords": {
            "en": [
              "birthdate",
              "birthday",
              "birth date"
            ],
            "fr": [
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
          "id": "birthdate-1983-02-01",
          "label": {
            "en": "1983-02-01"
          },
          "date": "1983-02-01",
          "age": 35,
          "keywords": {
            "en": [
              "birthdate",
              "birthday",
              "birth date"
            ],
            "fr": [
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
          "id": "birthdate-1941-02-01",
          "label": {
            "en": "1941-02-01"
          },
          "date": "1941-02-01",
          "age": 77,
          "keywords": {
            "en": [
              "birthdate",
              "birthday",
              "birth date"
            ],
            "fr": [
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

 test('should extract birth dates', async () => {
    for (let i = 0; i < tests.length; i++) {
      const output = await parse(tests[i].input)
      // console.log('output: ' + JSON.stringify(output, null, 2))
      expect(output).toEqual(tests[i].output)
    }
 })