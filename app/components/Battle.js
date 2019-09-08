import React, { useContext, useState } from 'react'
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle
} from 'react-icons/fa'
import PropTypes from 'prop-types'
import ThemeContext from '../contexts/theme'
import { Link } from 'react-router-dom'

const Instructions = () => {
  const theme = useContext(ThemeContext)
  return (
    <div className='instructions-container'>
      <h1 className='center-text header-lg'>INSTRUCTIONS</h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>Enter two GitHub users</h3>
          <FaUserFriends
            className={`bg-${theme}`}
            color='rgb(255, 191, 116)'
            size={140}
          />
        </li>
        <li>
          <h3 className='header-sm'>Battle</h3>
          <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>See the winner</h3>
          <FaTrophy
            className={`bg-${theme}`}
            color='rgb(255, 215, 0)'
            size={140}
          />
        </li>
      </ol>
    </div>
  )
}

const PlayerInput = props => {
  const [username, setUsername] = useState('')
  const theme = useContext(ThemeContext)
  const handleSubmit = () => {
    event.preventDefault()
    props.onSubmit(username)
  }
  const handleChange = ({ target }) => setUsername(target.value)

  return (
    <form onSubmit={handleSubmit} className='column player'>
      <label htmlFor='username' className='player-label'>
        {props.label}
      </label>
      <div className='row player-inputs'>
        <input
          type='text'
          className={`input-${theme}`}
          placeholder='github username'
          autoComplete='off'
          onChange={handleChange}
          value={username}
        />
        <button
          className={`btn btn-${theme === 'dark' ? 'light' : 'dark'}`}
          type='submit'
          disabled={!username}>
          Submit
        </button>
      </div>
    </form>
  )
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

const PlayerPreview = ({ username, onReset, label }) => {
  const theme = useContext(ThemeContext)
  return (
    <div className='column player'>
      <h3 className='player-label'>{label}</h3>
      <div className={`row bg-${theme}`}>
        <div className='player-info'>
          <img
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
            className='avatar-small'
          />
          <a href={`https://github.com/${username}`} className='link'>
            {username}
          </a>
        </div>
        <button className='btn-clear flex-center' onClick={onReset}>
          <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
        </button>
      </div>
    </div>
  )
}

PlayerPreview.proptypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

const Battle = () => {
  const [playerOne, setPlayerOne] = useState(null)
  const [playerTwo, setPlayerTwo] = useState(null)

  return (
    <>
      <Instructions />
      <div className='players-container'>
        <h1 className='center-text header-lg'>Players</h1>
        <div className='row space-around wrap'>
          {!playerOne ? (
            <PlayerInput
              label='Player One'
              onSubmit={player => setPlayerOne(player)}
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              label='Player One'
              onReset={() => setPlayerOne(null)}
            />
          )}

          {!playerTwo ? (
            <PlayerInput
              label='Player One'
              onSubmit={player => setPlayerTwo(player)}
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              label='Player Two'
              onReset={() => setPlayerTwo(null)}
            />
          )}
        </div>

        {playerOne && playerTwo && (
          <Link
            className='btn btn-dark btn-space'
            to={{
              pathname: '/battle/results',
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
            }}>
            Battle
          </Link>
        )}
      </div>
    </>
  )
}

export default Battle
