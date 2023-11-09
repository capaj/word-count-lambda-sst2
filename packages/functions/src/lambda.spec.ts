import { describe, expect, it } from 'vitest'
import { handler } from './lambda'

describe('wordTypeCount', () => {
  it('should return the correct word type count', async () => {
    handler(
      { body: '"the quick brown fox jumped over the lazy dog"' } as any,
      {} as any
    ).then((result) => {
      expect(result.statusCode).toEqual(200)
      expect(JSON.parse(result.body as string)).toMatchInlineSnapshot(`
        {
          "adjective": 0,
          "adverb": 0,
          "conjunction": 0,
          "determiner": 1,
          "interjection": 0,
          "noun": 1,
          "numeral": 0,
          "preposition": 1,
          "pronoun": 0,
          "verb": 0,
        }
      `)
    })
    handler(
      {
        body: `"happy go lucky drive \\ndrive"`
      } as any,
      {} as any
    ).then((result) => {
      expect(result.statusCode).toEqual(200)
      expect(JSON.parse(result.body as string)).toMatchInlineSnapshot(
        `
        {
          "adjective": 1,
          "adverb": 0,
          "conjunction": 0,
          "determiner": 0,
          "interjection": 0,
          "noun": 0,
          "numeral": 0,
          "preposition": 0,
          "pronoun": 0,
          "verb": 1,
        }
      `
      )
    })
    handler(
      {
        body: `"happy me study themselves"`
      } as any,
      {} as any
    ).then((result) => {
      expect(result.statusCode).toEqual(200)
      expect(JSON.parse(result.body as string)).toMatchInlineSnapshot(`
        {
          "adjective": 1,
          "adverb": 0,
          "conjunction": 0,
          "determiner": 0,
          "interjection": 0,
          "noun": 0,
          "numeral": 0,
          "preposition": 0,
          "pronoun": 2,
          "verb": 1,
        }
      `)
    })
  })

  it('should return 400 if no body is provided', async () => {
    handler({ body: '' } as any, {} as any).then((result) => {
      expect(result.statusCode).toEqual(400)
      expect(result.body).toMatchInlineSnapshot('"No body"')
    })
  })
})
