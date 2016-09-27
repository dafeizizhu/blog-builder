var http = require('http')
var spawn = require('child_process').spawn
var createHandler = require('github-webhook-handler')

var handler = createHandler({ path: '/auto-build', secret: '50f799d8b5f6de0f' })

http.createServer((req, res) => {
  handler(req, res, err => {
    res.statusCode = 404 
    res.end('no such location')
  })
}).listen(6666)

handler.on('error', err => {
  console.log('Error:', err.message)
})

handler.on('push', evt => {
  console.log('Recieve a push event')
  runCommand('sh', ['./auto-build.sh'], txt => {
    console.log(txt)
  })
})

function runCommand(cmd, args, callback) {
  var child = spawn(cmd, args)
  var resp = ''
  child.stdout.on('data', buffer => resp += buffer.toString())
  child.stdout.on('end', () => callback(resp))
}
