import { Switch, Route } from 'react-router-dom'
import { Dashboard, Login, Register, Store } from './pages'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Store} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/dashboard' component={Dashboard} />
    </Switch>
  );
}

export default App;
