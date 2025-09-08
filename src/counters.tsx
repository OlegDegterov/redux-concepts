import "./App.css";
import {
  selectCounter,
  useAppSelector,
  type CounterId,
  type DecrementAction,
  type IncrementAction,
} from "./store";
import { useDispatch } from "react-redux";

function Counters() {
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

export default Counters;
