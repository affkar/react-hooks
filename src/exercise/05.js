// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  
  //1. React lets us interact with React Elements using JSX whereas the Browser and Javascript play with Dom nodes whereas 
  //   React lets us use Dom nodes only when we use React.createElement. 
  //2. Now, Let's say we want to use JSX(we love this syntax sugar) and we want to get a reference to the dom node that React creates internally, then we could use React Refs. 
  //   A use case for getting hold of the reference to the dom node could be - A javascript library needing access to a dom node. 
  //In this example, we have vanillaTilt which is a library that given a dom node, it will provide a tilt animation for that dom node.
  //Creating a Ref: We can create refs with React.useRef(). The Ref's current value will be held in ref.current.
  //A React ref can be sent into a div's ref attribute, once React creates the elements and mounts the component, 
  //the Dom element is set to the React ref.current value. Dom element namely the div which had the ref attribute. 
  
  const tiltRef = React.useRef()

  React.useEffect(() => {
    const tiltNode = tiltRef.current
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })
    return () => {
      tiltNode.vanillaTilt.destroy()
    }
  }, [tiltRef])

  return (
    <div className="tilt-root" ref={tiltRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
