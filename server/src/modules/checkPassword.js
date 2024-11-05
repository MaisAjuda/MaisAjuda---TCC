const bycrypt = require('bcrypt')

module.exports = async function checkPassword(pass, passEncrypt) {
    const match = await bycrypt.compare(pass, passEncrypt)
    return match  
}