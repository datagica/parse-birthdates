
const tokenize = require('@datagica/tokenize')()
const ageToBirthDate = require('./ageToBirthDate')
const birthDateToAge = require('./birthDateToAge')

// inferring a birthday from an age only make sense
// when written in a declarative way such as: "age: 18 years old"
// in a curriculum or profile, this is why we have reasonable limits.
const MIN = 15
const MAX = 99

function algorithm ({
    sentence,   // the chunk (ie. the actual piece of text)
    positions,  // global positions of sentences, words, characters
    results     // buffer to collect the results
  }) {

  const lastWordPosition = positions.word  
  // create a unique pattern context (to prevent shared ressource conflicts)
  const ageGroup = "(1[5-9]|[2-9][0-9])";
  const ageSuffix = `ans|years|years old|yo|godina|години|år|jaar oud|anos|лет|let|` +
  `ετών|jahre|vuotias|岁|歳|שנים|سنة|عُمْرِي`
  const agePrefix = `age|âge|edad|età|dob|věk|vek|starost|leeftijd|`+
    `ikä|alder|ålder|alter|ηλικία|vârsta|возраст|възраст|vanus` +
    `年龄|年齡|อายุ|yaş|tuổi` + 
    `العمر`+
     `גיל`

  const agePattern = new RegExp(
    `(?:` +
      `${ageGroup}\\s?(?:${ageSuffix})` +
    `|` +
      `(?:${agePrefix})\\s?:?\\s?${ageGroup}` +
    `)`, "gi");
  
  const pattern = new RegExp(
    `(?:` +
      `${ageGroup}\\s?(?:${ageSuffix})` +
    `|` +
      `(?:${agePrefix})\\s?:?\\s?${ageGroup}` +
    `)`, "gi");

  let match
  while (match = pattern.exec(sentence)) {
    const ngram = match[0].trim()  
    const age = (match !== null) ? parseInt((typeof match[1] === 'string') ? match[1] : match[2]) : undefined;  
    let entity
    if (!isNaN(age) && isFinite(age) && age >= MIN && age <= MAX) {
      const birthDate = ageToBirthDate(age)
      const month = ("00" + (birthDate.getMonth() + 2)).substr(-2,2)
      const date = ("00" + birthDate.getDate()).substr(-2,2)
      const year = birthDate.getFullYear()
      entity = {
        id: `birthdate-${year}-${month}-${date}`,
        label: {
          en: `${year}-${month}-${date}`,
        },
        date: `${year}-${month}-${date}`,
        age,
        keywords: {
          en: [
            'birthdate',
            'birthday',
            'birth date'
          ],
          fr: [
            'date de naissance'
          ]
        }
      }
    }  
    const nbWords = sentence.slice(0, pattern.lastIndex)
                            .split(/[ \r\n]/g)
                            .length  
    results.push({
      ngram: ngram,
      value: entity,
      score: 1,
      position: {
        sentence: positions.sentence,
        word    : lastWordPosition    + nbWords,
        begin   : positions.character + pattern.lastIndex,
        end     : positions.character + pattern.lastIndex + ngram.length
      }
    })
  }
}

async function parseBirthdays (input) {
  return await tokenize(input, algorithm, [])
}

module.exports = parseBirthdays.default = parseBirthdays