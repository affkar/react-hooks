// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

// as part of this we can choose not to
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
        setState({error: error, status: 'rejected'})
      })
  }, [pokemonName])

  if (state.status === 'rejected') {
    throw new Error(state.error.message)
  } else if (state.status === 'idle') {
    return 'Submit a pokemon'
  } else if (state.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (state.status === 'resolved') {
    return <PokemonDataView pokemon={state.pokemonInfoState} />
  }
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  //
  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
