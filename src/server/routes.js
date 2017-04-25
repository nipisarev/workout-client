import {App} from '../App';
import {Catalog} from '../components/pages/Catalog';
import {ItemContainer} from '../components/pages/Item';
import {Route} from 'react-router';

function makeRoutes(routesConfig = [], parentPath = '') {
  return routesConfig.map(({path, component, children}) => (
    <Route
      path={`${parentPath}${path}`}
      component={(...props) =>
        ((Component) => <Component {...props}>{makeRoutes(children, `${parentPath}${path}/`)}</Component>)(component)
      }
    />
  ))
}

const routes = [
  {
    path: '',
    component: App,
    children: [
      {
        path: 'catalog',
        component: Catalog,
        lazy: true,
        children: [
          {
            path: 'item',
            component: ItemContainer,
            lazy: true
          }
        ]
      },
      {
        path: 'page2',
        component: App
      }
    ]
  }
];

export default makeRoutes(routes);



