const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12)
    const password_digest = await bcrypt.hash(password, salt)
    console.log('salt:', salt)
    console.log('pass:', password_digest)
    return password_digest
  } catch (err) {
    console.log('ERROR', err)
  }
}

const comparePasswords = async (candidatePassword, passwordDigest) => {
  try {
    const match = await bcrypt.compare(candidatePassword, passwordDigest)
    return match
  } catch (err) {
    console.log('ERROR', err)
  }
}

const loginRequired = (req,res,next) => {
  if (req.user) return next()
  res.status(401).json({
    payload: null,
    msg: 'you need to be logged in',
    error: true
  })
}

module.exports = {
  hashPassword,
  comparePasswords,
  loginRequired
}
