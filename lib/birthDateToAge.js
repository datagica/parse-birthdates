
function birthDateToAge (birthDate) {
  const now = new Date()
  let age = now.getFullYear() - birthDate.getFullYear()
  const m = now.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

module.exports = birthDateToAge