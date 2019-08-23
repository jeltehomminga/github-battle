import React from 'react'

const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  }
}

const withHover = (Component, propName = 'hovering') => {
  return class WithHover extends React.Component {
    state = {
      hovering: false
    }
    render() {
      const props = {
        [propName]: this.state.hovering,
        ...this.props
      }
      return (
        <div
          onMouseOver={() => this.setState({ hovering: true })}
          onMouseOut={() => this.setState({ hovering: false })}
          style={styles.container}>
          <Component hovering={this.state.hovering} {...props} />
        </div>
      )
    }
  }
}

export default withHover
