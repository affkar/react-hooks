import * as React from 'react'
export default function AnotherChild({buttonValue}) {
  console.log('%c    AnotherChild: render start', 'color: MediumSpringGreen')

  const [count, setCount] = React.useState(() => {
    console.log('%c    AnotherChild: useState(() => 0)', 'color: tomato')
    return 0
  })

  React.useEffect(() => {
    setCount(buttonValue)
    console.log(
      '%c    AnotherChild: useEffect(() => {setCount(buttonValue)}, [buttonValue])',
      'color: LightCoral',
    )
    return () => {
      console.log(
        '%c    AnotherChild: useEffect(() => {setCount(buttonValue)}, [buttonValue]) cleanup 🧹',
        'color: LightCoral',
      )
    }
  }, [buttonValue])

  React.useEffect(() => {
    console.log('%c    AnotherChild: useEffect(() => {})', 'color: LightCoral')
    return () => {
      console.log(
        '%c    AnotherChild: useEffect(() => {}) cleanup 🧹',
        'color: LightCoral',
      )
    }
  })

  React.useEffect(() => {
    console.log(
      '%c    AnotherChild: useEffect(() => {}, [])',
      'color: MediumTurquoise',
    )
    return () => {
      console.log(
        '%c    AnotherChild: useEffect(() => {}, []) cleanup 🧹',
        'color: MediumTurquoise',
      )
    }
  }, [])

  React.useEffect(() => {
    console.log(
      '%c    AnotherChild: useEffect(() => {}, [count])',
      'color: HotPink',
    )
    return () => {
      console.log(
        '%c    AnotherChild: useEffect(() => {}, [count]) cleanup 🧹',
        'color: HotPink',
      )
    }
  }, [count])

  const element = (
    <button onClick={() => setCount(previousCount => previousCount + 1)}>
      Button Value {buttonValue}
      count {count}
    </button>
  )

  console.log('%c    AnotherChild: render end', 'color: MediumSpringGreen')

  return element
}
