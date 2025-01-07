import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import axios from "axios";
import { thunk } from "redux-thunk";

// Action
const initialState = {
  amount: 0,
};

// History Store
const history = [];

// Action Constant Variable
const INIT = "init";
const INCREMENT = "increment";
const DECREMENT = "decrement";
const INCREMENT_BY_AMOUNT = "incrementByAmount";

// setInterval Stopper
let breakInterval = 0;

// Store
const store = createStore(reducer, applyMiddleware(logger.default, thunk));

// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case "INIT":
      return {
        amount: action.payload,
      };
    case "INCREMENT":
      return {
        amount: state.amount + 1,
      };
    case "DECREMENT":
      return {
        amount: state.amount - 1,
      };
    case "INCREMENT_BY_AMOUNT":
      return {
        amount: state.amount + action.payload,
      };
    default:
      return state;
  }
}

// Store Subscribe
// store.subscribe(() => {
//   // console.log("the amount", store.getState());
//   history.push(store.getState());
//   console.log("the history", history);
// });

// Async API Call
// axios
function fetchData(id, type) {
  return async (dispatch) => {
    const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
    dispatch(actionName(type, data.amount));
  };
}

// Dispatch Action Function
function actionName(action, value = 0) {
  return {
    type: action,
    payload: value,
  };
}

//* If want to dispatch multiple action
// let stopInterval = setInterval(() => {
//   store.dispatch(fetchData);
//   breakInterval++;
//   if (
//     (store.getState().amount >= 30 || store.getState().amount <= -30) &&
//     breakInterval >= 1
//   ) {
//     clearInterval(stopInterval);
//   }
// }, 1000);

// * If want to dispatch single action
setTimeout(() => {
  store.dispatch(fetchData(2, "INIT"));
}, 1000);

// store.dispatch({ type: "INCREMENT" });
// console.log("the amount", store.getState());
// store.dispatch({ type: "INCREMENT" });
// console.log("the amount", store.getState());
// store.dispatch({ type: "INCREMENT" });
// console.log("the amount", store.getState());
