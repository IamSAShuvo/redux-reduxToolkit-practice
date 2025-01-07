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
let intervalStopper = 0;

// Store
const store = createStore(
  reducer,
  applyMiddleware(logger.default, thunk.default)
);

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
async function fetchData() {
  const { data } = await axios.get("http://localhost:3000/accounts/1");
  return data;
}

// Dispatch Action Function
async function actionName(action, value = 0) {
  const { data } = await axios.get("http://localhost:3000/accounts/1");
  return {
    type: action,
    payload: value,
  };
}

let stopInterval = setInterval(() => {
  store.dispatch(actionName("INIT", 500));
  intervalStopper++;
  if (
    (store.getState().amount >= 30 || store.getState().amount <= -30) &&
    intervalStopper >= 1
  ) {
    clearInterval(stopInterval);
  }
}, 1000);

// store.dispatch({ type: "INCREMENT" });
// console.log("the amount", store.getState());
// store.dispatch({ type: "INCREMENT" });
// console.log("the amount", store.getState());
// store.dispatch({ type: "INCREMENT" });
// console.log("the amount", store.getState());
