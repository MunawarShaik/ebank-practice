import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route exact path="/bad-path" component={NotFound} />
    <Route component={NotFound} />
  </Switch>
)

export default App
