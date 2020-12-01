import React from 'react';
import ReactDOM from 'react-dom';

//Components
import App from './components/App';

//Styles
//import './styles/index.css';

//Mobx
import store from './stores';
import { Provider } from 'mobx-react';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
