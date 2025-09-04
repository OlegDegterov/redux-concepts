import { useEffect, useReducer } from "react";
import "./App.css";
import {
  store,
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

export function Counter({ counterId }: { counterId: CounterId }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });

    return unsubscribe;
  }, []);
  return (
    <div className="card">
      counter {store.getState().counters[counterId]?.counter}
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
