
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

  console.log('sentence: '+ sentence)

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
    console.log('ok')
    const ngram = match[0].trim()  
    const age = (match !== null) ? parseInt((typeof match[1] === 'string') ? match[1] : match[2]) : undefined;  
    console.log('match: '+JSON.stringify(match))
    let entity
    if (!isNaN(age) && isFinite(age) && age >= MIN && age <= MAX) {
      const birthDate = ageToBirthDate(age)
      entity = {
        id: `birthdate-${birthDate.getFullYear()}`,
        label: {
          en: `${birthDate.toString()}`,
        },
        timestamp: +birthDate,
        month: birthDate.getMonth() + 1,
        date: birthDate.getDate(),
        year: birthDate.getFullYear(),
        age: age,
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