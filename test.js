const { BluzelleClient } = require('bluzelle')

const main = async () => {
  const bluzelle = new BluzelleClient(
    'ws://testnet.bluzelle.com:51010',
    '8d758875-d426-4b92-9a45-41ce63f8032e')

  await bluzelle.connect()
  console.log(await bluzelle.read('94701100bb3197b9fa48d01201549b63dd19b5c3d035088eb5f21783b434c707'))
  bluzelle.disconnect()
}

main().catch(e => { console.log(e.message) })
