import React from 'react'

const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  }
}

export default class Hover extends React.Component {
  state = {
    hovering: false
  }
  render() {
    return (
      <div
        onMouseOver={() => this.setState({ hovering: true })}
        onMouseOut={() => this.setState({ hovering: false })}
        style={styles.container}>
        {this.props.render(this.state.hovering)}
      </div>
    )
  }
}
