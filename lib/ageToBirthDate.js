
  // we can't do miracles, but we can get a rough estimation
  function ageToBirthDate (age) {
    return new Date((new Date().getFullYear()) - age, 0, 1)
  }

  module.exports = ageToBirthDate
