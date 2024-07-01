import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk';
import rootReducer from './reducer'

const sampleMiddleware = storeAPI => next => action =>{
  // console.log('This statement is executed during the process of dispatching the action and BEFORE the reducer function handle the action.');
  const result = next(action); //Ito code kung saan ipapasa na sa reducer function yung action object.
  // console.log('This statement is executed during the process of dispatching the action and AFTER the reducer function handle the action.');
  return result;
}

const customizedMiddleware = composeWithDevTools(applyMiddleware(thunk));


const store = createStore(rootReducer, customizedMiddleware);
export default store
