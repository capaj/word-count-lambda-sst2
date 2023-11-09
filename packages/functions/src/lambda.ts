import { ApiHandler } from 'sst/node/api'
import { vocabulary } from '../vocabulary'

// @ts-expect-error
const objectKeys = <Obj>(obj: Obj) => Object.keys(obj) as (keyof Obj)[]

/**
 * event.body is a JSON.stringified string of words separated by spaces or any other whitespace
 */
export const handler = ApiHandler(async (evt) => {
  if (!evt.body) {
    return {
      statusCode: 400,
      body: 'No body'
    }
  }

  let parsed
  try {
    parsed = JSON.parse(evt.body)
  } catch (err) {
    return {
      statusCode: 400,
      body: 'Invalid body, body must be a JSON.stringified string of words separated by spaces or any other whitespace'
    }
  }
  const words = parsed.split(/\s+/)

  const counts = {
    noun: 0,
    verb: 0,
    adjective: 0,
    adverb: 0,
    preposition: 0,
    conjunction: 0,
    pronoun: 0,
    interjection: 0,
    determiner: 0,
    numeral: 0
  }

  objectKeys(vocabulary).forEach((wordType) => {
    vocabulary[wordType].forEach((word) => {
      if (words.includes(word)) {
        counts[wordType] += 1
      }
    })
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(counts)
  }
})
