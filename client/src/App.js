import {useRoutes} from 'hookrouter';
import Routes from './router/routes';
//components
import Home from './pages/Home';
import Admin from './pages/Admin';



function App() {  
  const routeResult = useRoutes(Routes)
  return (
    routeResult
  );
}

export default App