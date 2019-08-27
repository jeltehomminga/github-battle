import React, { Component } from 'react'
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle
} from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'
import { ThemeConsumer } from '../contexts/theme'

const Instructions = () => {
  return (
    <ThemeConsumer>
      {({ theme }) => (
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
              <FaFighterJet
                className={`bg-${theme}`}
                color='#727272'
                size={140}
              />
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
      )}
    </ThemeConsumer>
  )
}

class PlayerInput extends Component {
  state = { username: '' }
  handleSubmit = () => {
    event.preventDefault()
    this.props.onSubmit(this.state.username)
  }
  handleChange = ({ target }) => this.setState({ username: target.value })
  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form onSubmit={this.handleSubmit} className='column player'>
            <label htmlFor='username' className='player-label'>
              {this.props.label}
            </label>
            <div className='row player-inputs'>
              <input
                type='text'
                className={`input-${theme}`}
                placeholder='github username'
                autoComplete='off'
                onChange={this.handleChange}
                value={this.state.username}
              />
              <button
                className={`btn btn-${theme === 'dark' ? 'light' : 'dark'}`}
                type='submit'
                disabled={!this.state.username}>
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    )
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

const PlayerPreview = ({ username, onReset, label }) => {
  return (
    <ThemeConsumer>
      {({ theme }) => (
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
      )}
    </ThemeConsumer>
  )
}

PlayerPreview.proptypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default class Battle extends Component {
  state = {
    playerOne: null,
    playerTwo: null,
    battle: false
  }
  render() {
    const { playerOne, playerTwo, battle } = this.state

    if (battle) {
      return (
        <Results
          playerOne={playerOne}
          playerTwo={playerTwo}
          onReset={() =>
            this.setState({ playerOne: null, playerTwo: null, battle: false })
          }
        />
      )
    }

    return (
      <>
        <Instructions />
        <div className='players-container'>
          <h1 className='center-text header-lg'>Players</h1>
          <div className='row space-around wrap'>
            {!playerOne ? (
              <PlayerInput
                label='Player One'
                onSubmit={player => this.setState({ playerOne: player })}
              />
            ) : (
              <PlayerPreview
                username={playerOne}
                label='Player One'
                onReset={() => this.setState({ playerOne: null })}
              />
            )}

            {!playerTwo ? (
              <PlayerInput
                label='Player One'
                onSubmit={player => this.setState({ playerTwo: player })}
              />
            ) : (
              <PlayerPreview
                username={playerTwo}
                label='Player Two'
                onReset={() => this.setState({ playerTwo: null })}
              />
            )}
          </div>

          {playerOne && playerTwo && (
            <button
              className='btn btn-dark btn-space'
              onClick={() => this.setState({ battle: true })}>
              Battle
            </button>
          )}
        </div>
      </>
    )
  }
}
