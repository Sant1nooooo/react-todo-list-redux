
//This is a Custom Enhancers for both dispatch and getState field of the store.
export function sayHiOnDispatch(createStore){
  return (rootReducer, preloadedState, enhancers) => 
    {
    const store = createStore(rootReducer, preloadedState, enhancers)

    function newDispatch(action) 
    {
      const result = store.dispatch(action);
      console.log('Hi!');

      return result;
    /*
      This is a wrapper function will be the new behavior of the 'dispatch' field of the store. by { ...store, dispatch: newDispatch } similar to reducer function.
      Pero kadalasan daw, ginagamit lang yung pag modify sa dispatch or store enhancer if gusto mong may mangyari AFTER ma-execute yung reducer function.
      FROM DOCUMENTATION:
      When we called `store.dispatch()`, we were actually calling the wrapper function from 
        `sayHiOnDispatch`, which called the original and then printed 'Hi'.
    */
    }

    //This is the code for modifying the actual or original behavior of the `dispatch` field of the `store` similar to reducer function.
    //Meaning yung original behavior ng `store.dispatch()`, magiging 'newDispatch' function sa taas  
    return { ...store, dispatch: newDispatch }
  }
}


export  function includeMeaningOfLife(createStore){
  return (rootReducer, preloadedState, enhancers) => {
    const store = createStore(rootReducer, preloadedState, enhancers)
    
    function newGetState() {
      //Similar to `sayHiOnDispatch`
      return { ...store.getState(), meaningOfLife: 42}
    }

  
    //Meaning yung original behavior ng 'store.getState()', magiging 'newGetState' function sa taas,
    return { ...store, getState: newGetState }
  }
}
