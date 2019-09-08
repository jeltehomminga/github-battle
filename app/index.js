import React, { useState, Suspense } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ThemeContext from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

const App = () => {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () =>
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'))
  return (
    <Router>
      <ThemeContext.Provider value={theme}>
        <div className={theme}>
          <div className='container'>
            <Nav toggleTheme={toggleTheme} />
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path='/' component={Popular} />
                <Route exact path='/battle' component={Battle} />
                <Route path='/battle/results' component={Results} />
                <Route component={() => <h1>Owwww.... no..... 404</h1>} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </ThemeContext.Provider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
