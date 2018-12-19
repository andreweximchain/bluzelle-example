const { BluzelleClient } = require('bluzelle')
var hash = require('hash.js')
var json = require('./data.json')

const main = async () => {
  const bluzelle = new BluzelleClient('ws://testnet.bluzelle.com:51010', '8d758875-d426-4b92-9a45-41ce63f8032e')
  await bluzelle.connect()
  for (var key in json['AggregatedData']) {
    for (var i in json['AggregatedData'][key]) {
      // console.log(i)
      var object = JSON.stringify(json['AggregatedData'][key][i])
      // console.log(temp)
      var tempWord = i.toString()
      var hashWord = hash.sha256().update(tempWord).digest('hex')
      console.log(hashWord, object)
      await upload(bluzelle, hashWord, object).catch(e => console.log(e))
    }
  }
}

async function upload (bluzelle, key, object) {
  var hasMyKey = await bluzelle.has(key)
  if (!hasMyKey) {
    await bluzelle.create(key, object)
    var value = await bluzelle.read(key)
    console.log(value === object)
  }
}

main().catch(e => console.log(e.message))
