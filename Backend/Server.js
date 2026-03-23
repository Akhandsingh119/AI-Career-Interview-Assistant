require("dotenv").config()
const App = require('./Src/app')
const ConnectDB = require('./Src/config/database')

ConnectDB()

if (process.env.NODE_ENV !== 'production') {
    App.listen(3000, () => {
        console.log("server is running on port 3000")
    })
}

module.exports = App