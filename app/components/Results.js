import React from 'react'
import { battle } from '../utils/api'

export default class Results extends React.Component {
  componentDidMount = () => {
    console.log(this.props)
    const { playerOne, playerTwo } = this.props
    battle([playerOne, playerTwo]).then(players =>
      console.log(`data: ${players}`)
    )
  }
  render() {
    return (
      <div>
        <h3>{JSON.stringify(this.props, null, 2)}</h3>
      </div>
    )
  }
}
