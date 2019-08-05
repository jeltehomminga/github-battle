import React, { Component } from 'react'

export default class Popular extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: 'All'
    }
    // this.handleSelectLanguage = this.handleSelectLanguage.bind(this)
  }
  handleSelectLanguage = selectedLanguage => this.setState({ selectedLanguage })
  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Python']
    return (
      <ul className='flex-center'>
        {languages.map(language => (
          <li key={language}>
            <button
              className='btn-clear nav-link'
              onClick={() => this.handleSelectLanguage(language)}
              style={
                this.state.selectedLanguage === language
                  ? { color: 'rgb(187, 46, 31)' }
                  : null
              }>
              {language}
            </button>
          </li>
        ))}
      </ul>
    )
  }
}
