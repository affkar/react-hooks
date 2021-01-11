// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

//Error Boundary Components are Cool. They can statically display some error content if we have an error.
//How does it know that there was an error, through two callback methods(which are called by React if there was an error thrown in any child component)
//1. static getDerivedStateFromError(error)
//2. componentDidCatch(error, info)
//
//So basically if the child component threw the error, you can get access to the error even in the parent(if you had implemented the one of the above two methods) and you can set it in the state of the parent.
//And you can conditionally (i.e if the error was in the state of the parent)render some useful error message.

// How can you throw an error if you do not have one..
//throw new Error('some exception message')

// key is being passed into the ErrorBoundary component for the purposes of making it rerender.

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false}
    console.log(
      `%c hasError in constructor of ErrorBoundary ${this.state.hasError}`,
      'color: yellow',
    )
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true, error}
  }
  render() {
    console.log(
      `%c hasError in render of ErrorBoundary ${this.state.hasError}`,
      'color: yellow',
    )
    return this.state.hasError ? (
      <this.props.fallbackComponent error={this.state.error} />
    ) : (
      this.props.children
    )
  }
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    pokemonInfoState: null,
    error: null,
    status: 'idle',
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: 'pending'})
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setState({pokemonInfoState: pokemonData, status: 'resolved'})
      })
      .catch(error => {
        setState({error, status: 'rejected'})
      })
  }, [pokemonName])

  if (state.status === 'rejected') {
    console.log(`%c ${state.error.message}`, 'color: green')
    throw new Error(state.error.message)
  } else if (state.status === 'idle') {
    return 'Submit a pokemon'
  } else if (state.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (state.status === 'resolved') {
    return <PokemonDataView pokemon={state.pokemonInfoState} />
  }
}

function ErrorFallback({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary key={pokemonName} fallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
