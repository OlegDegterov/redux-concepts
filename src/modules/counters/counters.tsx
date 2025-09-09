import "../../App.css";
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import {
  selectCounter,
  type CounterId,
  incrementAction,
  decrementAction,
} from "./counters.slice";

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
      <button onClick={() => dispatch(incrementAction({ counterId }))}>
        increment
      </button>
      <button onClick={() => dispatch(decrementAction({ counterId }))}>
        decrement
      </button>
    </div>
  );
}

export default Counters;
