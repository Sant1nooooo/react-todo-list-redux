
/*
  In these frameworks, middleware is some code you can put between the 
  framework receiving a request, and the framework generating a response.

  Meaning ito yung mga functions na ine-execute once na ma-call yung `store.dispatch()`
  PERO ine-execute muna itong mga function na to BEFORE ma-execute yung mga reducer functions
  in response to the 'store.dispatch'
  
  ChatGPT: n Redux, middleware is used to extend the store's capabilities by intercepting and acting on dispatched actions before they reach the reducer function.

  Similar before ito sa middleware ng NextAuthJS kung saan always na inee-execute yung function everytime na nag kakaroon ng events 
  (submitting forms, clicking buttons, event navigating to different pages) kung saan iche-check if authorize ba yung user na gawin 
  yung function or i-visit yung page.
  
  SEQUENCE OF EVENTS:
  1. Executing store.dispatch()
  2. Executing all the function in middleware and returning to the call stack.
  3. And last is executing the reducer function base on the action dispatched by the 'store.dispatch()'

  DOCUMENTATION:
  - The print1 middleware (which we see as store.dispatch)
  - The print2 middleware
  - The print3 middleware
  - The original store.dispatch
  - The root reducer inside store

  Pwede din mag-lagay ng side effects
  LINK: https://redux.js.org/tutorials/fundamentals/part-4-store#using-middleware 

  Writing Custom Middleware: https://redux.js.org/tutorials/fundamentals/part-4-store#writing-custom-middleware
*/
export const print1 = (storeAPI) => (next) => (action) => {
  console.log('1')
  return next(action)
}

export const print2 = (storeAPI) => (next) => (action) => {
  console.log('2')
  return next(action)
}

export const print3 = (storeAPI) => (next) => (action) => {
  console.log('3')
  return next(action)
}

/*
const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', storeAPI.getState())
  return result
}

Whenever an action is dispatched:

1. The first part of the `handleAction` function runs, and we print 'dispatching'
2. We pass the action to the `next` section, which may be another middleware or the real `store.dispatch`
3. Eventually the reducers run and the state is updated, and the next function returns
4. We can now call `storeAPI.getState()` and see what the new state is
5. We finish by returning whatever `result` value came from the `9` middleware
*/

