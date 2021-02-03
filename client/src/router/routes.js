import Admin from '../pages/Admin';
import Home from '../pages/Home';

const routes = {
    '/': () => <Home />,
    '/admin': () => <Admin />
}

export default routes