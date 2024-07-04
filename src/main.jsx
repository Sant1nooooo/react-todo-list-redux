import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import './api/server'
import store from './store';

import { fetchTodos } from './feature/todos/todoSlice';

// store.dispatch(fetchTodos());
ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <App />
    </Provider>


)





// import React from 'react'
// import ReactDOM from 'react-dom'
// import './index.css'
// import App from './App'



// import store from './store'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// )
