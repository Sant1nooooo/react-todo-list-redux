import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk';
import rootReducer from './reducer'

const sampleMiddleware = storeAPI => next => action =>{
  // if(typeof action === 'fucntion')
  // {
  //   return action(storeAPI.dispatch, storeAPI.getState)
  // }
  // console.log('This statement is executed during the process of dispatching the action and BEFORE the reducer function handle the action.');
  const result = next(action); //Ito code kung saan ipapasa na sa reducer function yung action object.
  // console.log('This statement is executed during the process of dispatching the action and AFTER the reducer function handle the action.');

}

const customizedMiddleware = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, customizedMiddleware);
// const store = createStore(rootReducer, applyMiddleware(sampleMiddleware));
export default store
