import { Switch, Route } from 'react-router-dom'
import { Login, Register, Store } from './pages'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Store} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
    </Switch>
  );
}

export default App;
