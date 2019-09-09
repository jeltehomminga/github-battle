import React, { useState, useRef, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

const LanguagesNav = ({ selected, onUpdateLanguage }) => {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Python']
  return (
    <ul className='flex-center'>
      {languages.map(language => (
        <li key={language}>
          <button
            className='btn-clear nav-link'
            onClick={() => onUpdateLanguage(language)}
            style={
              selected === language ? { color: 'rgb(187, 46, 31)' } : null
            }>
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

const ReposGrid = ({ repos }) => {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues
        } = repo
        const { login, avatar_url } = owner
        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}>
              {' '}
              <ul className='card-list'>
                <li>
                  <Tooltip text={'GitHub username'}>
                    <FaUser color='rgb(255, 191, 116)' size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color='rgb(255, 215, 0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(214, 138, 147)' size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

const popularReducer = (state, action) => {
  if (action.type === 'succes') {
    return {
      ...state,
      [action.selectedLanguage]: action.repos,
      error: null
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error.message
    }
  } else {
    throw new Error('unknown action type')
  }
}

const Popular = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [state, dispatch] = useReducer(popularReducer, { error: null })
  const fetchedLanguages = useRef([])

  useEffect(() => {
    if (!fetchedLanguages.current.includes(selectedLanguage)) {
      fetchedLanguages.current.push(selectedLanguage)

      fetchPopularRepos(selectedLanguage)
        .then(repos => dispatch({ type: 'succes', selectedLanguage, repos }))
        .catch(error => dispatch({ type: 'error', error }))
    }
  }, [fetchedLanguages, selectedLanguage])

  const isLoading = () => !state[selectedLanguage] && state.error === null

  return (
    <>
      <LanguagesNav
        selected={selectedLanguage}
        onUpdateLanguage={setSelectedLanguage}
      />
      {isLoading() && <Loading text={'Fetching repos'} />}

      {state.error && <p className='error'>{state.error}</p>}

      {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
    </>
  )
}

export default Popular
