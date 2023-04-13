var PasswordToken = require("./PasswordToken")
var bcrypt = require("bcrypt")
var knex = require("../database/connection")

class Main {
    async changePassword(newPassword, id, token) {
        var hash = await bcrypt.hash(newPassword, 10)

        await knex.update({ password: hash }).where({ id: id }).table("users")

        await PasswordToken.setUsed(token)
    }
}

module.exports = new Main()