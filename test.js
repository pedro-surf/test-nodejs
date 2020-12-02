const tape = require('tape')
const jsonist = require('jsonist')

const PORT = process.env.PORT = process.env.PORT || require('get-PORT-sync')()
const server = require('./server')
const getIcon = require('./src/utils/index').getIcon;

const urlBase = `http://localhost:${PORT}`

tape('should respond hello', (t) => {
  jsonist.get(urlBase, (err, body) => {
    if (err) t.error(err)

    t.equal(body.msg, 'hello')
    t.end()
  })
})

tape('should return base64', (t) => {
    jsonist.get(`${urlBase}/base64`, (err, body) => {
      if (err) t.error(err)
      const mockData = getIcon();
      t.equal(body.data, mockData)
      t.end()
    })
  })
  

tape('cleanup', function (t) {
  server.close()
  t.end()
})