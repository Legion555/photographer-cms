import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Gallery from './pages/Gallery';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//redux
import { useSelector } from 'react-redux';



function App() {
  const view = useSelector(state => state.view);

  return (
      <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Gallery />
          </Route>
          <Route path="/dashboard" render={routeProps => {
            if (view !== 'dashboard') {
              return null
            }
            return <Dashboard />
          }}
          />
          <Route path="/admin">
            <Login />
          </Route>
        </Switch>
      </Router>
      </div>
  );
}

export default App

// <Router>
//   <Switch>
//     <Route path="/">
//       <Gallery />
//     </Route>
//     <Route path="/admin">
//       <Dashboard />
//     </Route>
//     <Route path="/login">
//       <Login />
//     </Route>
//   </Switch>
// </Router>