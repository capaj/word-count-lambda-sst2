import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [wordTypeCount, setWordTypeCount] = useState(null)
  const [error, setError] = useState<null | Error>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const VITE_APP_API_URL =
      import.meta.env.VITE_APP_API_URL ??
      'https://s9359hws1d.execute-api.us-east-1.amazonaws.com'

    try {
      const response = await fetch(VITE_APP_API_URL + '/wordTypeCount', {
        method: 'POST',
        body: JSON.stringify(input)
      }).then(
        (response) => response.json(),
        (error) => {
          console.error(error)
          return setError(error)
        }
      )

      setWordTypeCount(response)
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <form
        onSubmit={(ev) => {
          ev.preventDefault()
          ev.stopPropagation()
          handleSubmit()
          return false
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '500px'
          }}
        >
          <label htmlFor="input">Input text</label>
          <textarea
            name={'input'}
            onChange={(event) => {
              setInput(event.target.value)
            }}
            style={{
              height: '300px'
            }}
          ></textarea>

          <label htmlFor="input">Results</label>
          {error && <div style={{ color: 'red' }}>{error.message}</div>}
          {loading ? (
            'Loading ...'
          ) : (
            <textarea
              name={'output'}
              disabled
              value={
                wordTypeCount
                  ? Object.entries(wordTypeCount)
                      .map(([type, count]) => `${type}: ${count}`)
                      .join('\n')
                  : ''
              }
              style={{
                height: '300px'
              }}
            ></textarea>
          )}

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default App
