// Hook flow
// https://github.com/donavon/hook-flow
// http://localhost:3000/isolated/examples/hook-flow.js

import * as React from 'react'
import Child from './Child'
import AnotherChild from './AnotherChild'

function App() {
  console.log('%cApp: render start', 'color: MediumSpringGreen')

  const [showChild, setShowChild] = React.useState(() => {
    console.log('%cApp: useState(() => true) for showChild', 'color: tomato')
    return true
  })

  const [showAnotherChild, setShowAnotherChild] = React.useState(() => {
    console.log(
      '%cApp: useState(() => true) for showAnotherChild',
      'color: yellow',
    )
    return true
  })
  const [
    valueForAnotherChildToUse,
    setValueForAnotherChildToUse,
  ] = React.useState(() => {
    console.log(
      '%cApp: useState(() => 0) for valueForAnotherChildToUse',
      'color: yellow',
    )
    return 0
  })

  React.useEffect(() => {
    console.log('%cApp: useEffect(() => {})', 'color: LightCoral')
    return () => {
      console.log('%cApp: useEffect(() => {}) cleanup 🧹', 'color: LightCoral')
    }
  })

  React.useEffect(() => {
    console.log('%cApp: useEffect(() => {}, [])', 'color: MediumTurquoise')
    return () => {
      console.log(
        '%cApp: useEffect(() => {}, []) cleanup 🧹',
        'color: MediumTurquoise',
      )
    }
  }, [])

  React.useEffect(() => {
    console.log('%cApp: useEffect(() => {}, [showChild])', 'color: HotPink')
    return () => {
      console.log(
        '%cApp: useEffect(() => {}, [showChild]) cleanup 🧹',
        'color: HotPink',
      )
    }
  }, [showChild])

  const element = (
    <>
      <label>
        <input
          type="checkbox"
          checked={showChild}
          onChange={e => setShowChild(e.target.checked)}
        />{' '}
        show child
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 50,
          width: 100,
          border: 'solid',
        }}
      >
        {showChild ? (
          <Child
            onCounterUpdated={newValue => {
              console.log('App Received New Value ', newValue)
              setValueForAnotherChildToUse(newValue)
            }}
          />
        ) : null}
      </div>
      <label>
        <input
          type="checkbox"
          checked={showAnotherChild}
          onChange={e => setShowAnotherChild(e.target.checked)}
        />{' '}
        Show Another child
      </label>
      {showAnotherChild && (
        <div>
          Showing another child{' '}
          <AnotherChild buttonValue={valueForAnotherChildToUse} />{' '}
        </div>
      )}
    </>
  )

  console.log('%cApp: render end', 'color: MediumSpringGreen')

  return element
}

export default App
