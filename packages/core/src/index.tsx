import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@mediatool-poc/tools'
import { AppLayout, Sidebar } from './layout'
import { routes } from './routing'
import { Routing } from './routing/routing'
import { ISidebarItem } from './types'
import './styles/index.css'

const sidebarItems: ISidebarItem[] = [
  {
    icon: '',
    label: 'Hub',
    path: '/hub'
  }
]

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppLayout
        sidebar={<Sidebar items={sidebarItems} />}
        main={<Routing routes={routes} />}
      />
    </BrowserRouter>
  </Provider>
)


ReactDOM.render(
  <App/>,
  document.querySelector('#app')
)