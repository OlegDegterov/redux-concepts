import { useEffect, useReducer, useRef } from "react";
import "./App.css";
import {
  store,
  type AppState,
  type CounterId,
  type DecrementAction,
  type IncrementAction,
} from "./store";

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

const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];

export function Counter({ counterId }: { counterId: CounterId }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  console.log("RENDER", counterId);

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

  const counterState = selectCounter(store.getState(), counterId);

  return (
    <div className="card">
      counter {counterState?.counter}
      <button
        onClick={() =>
          store.dispatch({
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
          store.dispatch({
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
