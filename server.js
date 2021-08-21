const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const { student, schema } = require('./schema/schema')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const cors = require('cors')
// APP
const app = express()
// database connection
uri = '###'
try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('mongodb connected successfully...');
} catch (error) {
    console.log('db not connected');
}
// Allow cross-origin request
app.use(cors())


// GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(8080, e => {
    console.log('Graphql project started on port 8080');
})
