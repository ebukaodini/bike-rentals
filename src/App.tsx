import { BrowserRouter, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>Hello World!!</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
