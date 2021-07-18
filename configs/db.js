const { Client } = require('pg')

const client = new Client(
   {
      user:process.env.PSQL_USER,
      host:process.env.PSQL_HOST,
      database: process.env.PSQL_DB,
      password: process.env.PSQL_PASS,
      port: 5432,
   }
   // `postgres://xmigoyhv:A2y2YqsKVchNDaTkryFpfbFywIIi4LXD@satao.db.elephantsql.com/xmigoyhv`
  )

module.exports=client;

