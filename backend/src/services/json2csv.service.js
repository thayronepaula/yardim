import { createWriteStream, readFileSync } from 'node:fs'
import { pipeline, Readable, Transform } from 'node:stream'
import { promisify } from 'node:util'
import Path from 'node:path'
import { tmpdir } from 'node:os'

const pipelineAsync = promisify(pipeline)

/**
 * Extrai chaves unicas dos objetos JSON em um array para formar os cabeçalhos do CSV.
 * @param {Object[]} data - Array de objetos JSON que serao convertidos para CSV.
 * @returns {string[]} - Um array de strings contendo todas as chaves únicas encontradas.
 */
function getUniqueHeaderKeys(array) {
  const uniqueKeys = new Set()

  array.forEach((obj) => {
    Object.keys(obj).forEach((key) => uniqueKeys.add(key))
  })

  return Array.from(uniqueKeys).map((key, index) => key)
}

function createReadableStream(data) {
  return new Readable({
    read() {
      for (const json of data) {
        this.push(JSON.stringify(json))
      }
      this.push(null)
    },
  })
}

function createCSVTransformStream(headerKeys) {
  let isFirstRow = true

  return new Transform({
    transform(chunk, encoding, cb) {
      const data = JSON.parse(chunk)

      const csvRow = headerKeys.reduce((accumulator, key, index) => {
        const character = headerKeys.length - 1 === index ? '' : ','

        let content = data[key] ?? ''
        if (typeof content === 'object') content = `${JSON.stringify(content)}`

        accumulator += `${content}${character}`
        return accumulator
      }, '')

      const rowOutput = isFirstRow ? `${csvRow}` : `\n${csvRow}`

      isFirstRow = false
      cb(null, rowOutput)
    },
  })
}

function createHeaderTransformStream(headerKeys) {
  let counter = 0

  return new Transform({
    transform(chunk, encoding, cb) {
      if (counter) return cb(null, chunk)

      counter++
      const myCsvHeader = `${headerKeys.join(',')}\n`

      cb(null, myCsvHeader.concat(chunk))
    },
  })
}

export async function json2csv(data) {
  const formattedData = Array.isArray(data) ? data : [data]

  const headerKeys = getUniqueHeaderKeys(formattedData)

  const readableStream = createReadableStream(formattedData)
  const csvTransformStream = createCSVTransformStream(headerKeys)
  const headerTransformStream = createHeaderTransformStream(headerKeys)

  const pathFile = Path.join(tmpdir(), `output-csv-${Date.now()}.csv`)

  await pipelineAsync(
    readableStream,
    csvTransformStream,
    headerTransformStream,
    createWriteStream(pathFile)
  )

  return readFileSync(pathFile, { encoding: 'utf8' })
}
