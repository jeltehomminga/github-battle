import React from 'react'

export default class Results extends React.Component {
  render() {
    return (
      <div>
        <h3>{JSON.stringify(this.props, null, 2)}</h3>
      </div>
    )
  }
}
