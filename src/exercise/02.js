// useEffect: persistent state
// 💯 effect dependencies
// http://localhost:3000/isolated/final/02.extra-2.js

import * as React from 'react'

function useLocalStorage(
  key,
  defaultValue = '',
  {serializer = JSON.stringify, deserializer = JSON.parse} = {},
) {
  const prevKeyRef = React.useRef(key)

  const [value, setValue] = React.useState(() => {
    const valueInStorage = window.localStorage.getItem(key)
    if (valueInStorage) {
      return deserializer(valueInStorage)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }

    prevKeyRef.current = key

    window.localStorage.setItem(key, serializer(value))
  }, [key, value, serializer])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorage('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
