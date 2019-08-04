import React, { Component } from 'react'

export default class Popular extends Component {
  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Python']
    return (
      <ul className='flex-center'>
        {languages.map(language => (
          <li key={language}>
            <button className='btn-clear nav-link'>{language}</button>
          </li>
        ))}
      </ul>
    )
  }
}
