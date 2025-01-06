import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

// Action
const initialState = {
  amount: 0,
};

// Action Constant Variable
const INCREMENT = "increment";
const DECREMENT = "decrement";
const INCREMENT_BY_AMOUNT = "incrementByAmount";

// Store
const store = createStore(reducer, applyMiddleware(logger.default));

// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
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

const history = [];

// store.subscribe(() => {
//   // console.log("the amount", store.getState());
//   history.push(store.getState());
//   console.log("the history", history);
// });

// Action Function
function actionName(action, value = 1) {
  return {
    type: action,
    payload: value,
  };
}

let stopInterval = setInterval(() => {
  store.dispatch(actionName("INCREMENT_BY_AMOUNT", 5));
  if (store.getState().amount >= 30 || store.getState().amount <= -30) {
    clearInterval(stopInterval);
  }
}, 1000);

// store.dispatch({ type: "INCREMENT" });
// console.log("the amount", store.getState());
// store.dispatch({ type: "INCREMENT" });
// console.log("the amount", store.getState());
// store.dispatch({ type: "INCREMENT" });
// console.log("the amount", store.getState());
