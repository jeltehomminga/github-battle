import React, { useState, useEffect, useReducer } from 'react'
import { battle } from '../utils/api'
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaUser
} from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Tooltip from './Tooltip'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

const ProfileList = ({ profile }) => {
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 115, 115)' size={22} />
        {profile.name}
      </li>

      {profile.location && (
        <Tooltip text={'User Location'}>
          <li>
            <FaCompass color='#795548' size={22} />
            {profile.location}
          </li>
        </Tooltip>
      )}

      {profile.company && (
        <Tooltip text={'User Company'}>
          <li>
            <FaBriefcase color='rgb(114, 115, 225)' size={22} />
            {profile.company}
          </li>
        </Tooltip>
      )}

      <li>
        <FaUsers color='rgb(129, 195, 245)' size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color='rgb(64, 183, 95)' size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
}

const battleReducer = (state, action) => {
  if (action.type === 'succes') {
    return {
      ...state,
      winner: action.players[0],
      loser: action.players[1],
      loading: false
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error.message,
      loading: false
    }
  } else {
    throw new Error('That action type is not supported')
  }
}

export default function Results({ location }) {
  const { playerOne, playerTwo } = queryString.parse(location.search)
  const [state, dispatch] = useReducer(battleReducer, {
    winner: null,
    loser: null,
    error: null,
    loading: true
  })

  useEffect(() => {
    console.log('check')
    battle([playerOne, playerTwo])
      .then(players => dispatch({ type: 'succes', players }))
      .catch(error => dispatch({ type: 'error', error }))
  }, [playerOne, playerTwo])

  const { winner, loser, error, loading } = state

  if (loading) {
    return <Loading speed={400} text={'Fetching'} />
  }

  if (error) {
    return <p className='center-text error'>{error}</p>
  }

  return (
    <>
      <div className='grid space-around container-sm'>
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}>
          <ProfileList profile={winner.profile} />
        </Card>

        <Card
          header={loser.score === winner.score ? 'Tie' : 'Loser'}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          href={loser.profile.html_url}
          name={loser.profile.login}>
          <ProfileList profile={loser.profile} />
        </Card>
      </div>
      <Link to={'/battle'} className='btn btn-dark btn-space'>
        Reset
      </Link>
    </>
  )
}
