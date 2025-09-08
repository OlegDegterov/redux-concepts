import { useEffect, useReducer, useRef } from "react";
import "./App.css";
import {
  selectCounter,
  store,
  useAppSelector,
  type AppState,
  type CounterId,
  type DecrementAction,
  type IncrementAction,
} from "./store";
import { useDispatch, useSelector } from "react-redux";

function App() {
  return (
    <>
      <div className="card">
        <Counter counterId="1" />
        <Counter counterId="2" />
      </div>
    </>
  );
}

export function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useDispatch();
  const counterState = useAppSelector((state) =>
    selectCounter(state, counterId)
  );
  console.log("RENDER", counterId);
  /*const [, forceUpdate] = useReducer((x) => x + 1, 0);
  

  const lastStateRef = useRef<ReturnType<typeof selectCounter>>(undefined);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentState = selectCounter(store.getState(), counterId);
      const lastState = lastStateRef.current;
      if (currentState !== lastState) {
        forceUpdate();
      }
      lastStateRef.current = currentState;
    });

    return unsubscribe;
  }, []);
  */
  // const counterState = selectCounter(store.getState(), counterId);

  return (
    <div className="card">
      counter {counterState?.counter}
      <button
        onClick={() =>
          dispatch({
            type: "increment",
            payload: {
              counterId,
            },
          } satisfies IncrementAction)
        }
      >
        increment
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "decrement",
            payload: {
              counterId,
            },
          } satisfies DecrementAction)
        }
      >
        decrement
      </button>
    </div>
  );
}

export default App;
