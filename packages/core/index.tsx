import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { store } from '@mediatool-poc/tools'
import { AppLayout, Sidebar } from './src/layout'
import { routes } from './src/routing'
import { Routing } from './src/routing/routing'
import { ISidebarItem } from './src/types'
import './src/styles/index.css'

const sidebarItems: ISidebarItem[] = [
  {
    icon: '',
    label: 'Hub',
    path: '/hub',
  }
]

const App = () => (
  <Provider store={store}>
    <ChakraProvider>
      <BrowserRouter>
        <AppLayout
          sidebar={<Sidebar items={sidebarItems} />}
          main={<Routing routes={routes} />}
        />
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
)


ReactDOM.render(
  <App/>,
  document.querySelector('#app')
)