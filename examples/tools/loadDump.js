// to get a d2gs.dump filter packet in wireshark with something like ip.src == 185.144.100.123 && ip.dst == 192.168.1.40
// then right click on first packet, do "follow tcp stream"
// then select raw as display format and select only the s->c packets
// then save as d2gs.dump and use this script

const {
  createSplitter,
  decompress,
  d2gsProtocol,
  d2gsReader
} = require('../..')

const ProtoDef = require('protodef').ProtoDef
const FullPacketParser = require('protodef').FullPacketParser

const protoToClient = new ProtoDef(false)
protoToClient.addTypes(d2gsReader)
protoToClient.addProtocol(d2gsProtocol, ['toClient'])

const parser = new FullPacketParser(protoToClient, 'packet')

parser.on('error', err => console.log('d2gsToClient error : ', err.message))

const splitter = createSplitter()

const fs = require('fs')

const dumpFile = fs.readFileSync('./d2gs.dump')

console.log(dumpFile.slice(0, 7))

const cleanedDumpFile = dumpFile.slice(7)
console.log(cleanedDumpFile.length)

async function load () {
  let lastOffset = 0
  for (let i = 0; i < Math.floor(cleanedDumpFile.length / 20); i += 20) {
    await Promise.resolve()
    splitter.write(cleanedDumpFile.slice(i, i + 20))
    lastOffset = i + 20
  }
  splitter.write(cleanedDumpFile.slice(lastOffset))
}

load().catch(err => console.log(err))

splitter.on('data', data => {
  console.log('here is the splitted data', data)

  console.log('decompressed data', decompress(data))

  if (data[0] !== 0x7A) { parser.write(decompress(data)) }
}

)

parser.on('data', packet => {
  const { data } = packet
  const { name, params } = data
  console.log('packet', name, params)
  if (packet.data.name === 'D2GS_STATEADD') { console.log('packet the length', packet.data.params.length) }
})
