import React, { Component } from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa'
import PropTypes from 'prop-types'

const Instructions = () => {
  return (
    <div className='instructions-container'>
      <h1 className='center-text header-lg'>INSTRUCTIONS</h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>Enter two GitHub users</h3>
          <FaUserFriends
            className='bg-light'
            color='rgb(255, 191, 116)'
            size={140}
          />
        </li>
        <li>
          <h3 className='header-sm'>Battle</h3>
          <FaFighterJet className='bg-light' color='#727272' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>See the winner</h3>
          <FaTrophy className='bg-light' color='rgb(255, 215, 0)' size={140} />
        </li>
      </ol>
    </div>
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
      <form onSubmit={this.handleSubmit} className='column player'>
        <label htmlFor='username' className='player-label'>
          {this.props.label}
        </label>
        <div className='row player-inputs'>
          <input
            type='text'
            className='input-light'
            placeholder='github username'
            autoComplete='off'
            onChange={this.handleChange}
            value={this.state.username}
          />
          <button
            className='btn btn-dark'
            type='submit'
            disabled={!this.state.username}>
            Submit
          </button>
        </div>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default class Battle extends Component {
  state = {
    playerOne: null,
    playerTwo: null
  }
  render() {
    const { playerOne, playerTwo } = this.state
    return (
      <>
        <Instructions />
        <div className='players-container'>
          <h1 className='center-text header-lg'>Players</h1>
          <div className='row space-around'>
            {!playerOne && (
              <PlayerInput
                label='Player One'
                onSubmit={player => this.setState({ playerOne: player })}
              />
            )}

            {!playerTwo && (
              <PlayerInput
                label='Player One'
                onSubmit={player => this.setState({ playerTwo: player })}
              />
            )}
          </div>
        </div>
      </>
    )
  }
}
