import { Fragment } from "react";
import { createStore } from "../utils/helpers/store";
import useStore from "../utils/hooks/useStore";

const store = createStore({ count: 0 });

export default function CounterWithStore() {
  return (
    <article className="w-screen h-screen text-center pt-40">
      <Counter1 />
      <Counter2 />
    </article>
  );
}

function Counter1() {
  const [state, setState] = useStore(store);

  function handleClick() {
    console.log("click counter 1");
    setState((prev) => ({ count: prev.count + 1 }));
  }

  console.log("counter1 rendering");

  return (
    <Fragment>
      <div className="block countdown mb-10">
        <span style={{ "--value": state.count }}></span>
      </div>
      <button className="btn btn-neutral" onClick={handleClick}>
        +
      </button>
    </Fragment>
  );
}

function Counter2() {
  const [state, setState] = useStore(store);

  function handleClick() {
    setState((prev) => ({ count: prev.count + 1 }));
  }

  console.log("counter2 rendering");

  return (
    <Fragment>
      <div className="block countdown mb-10">
        <span style={{ "--value": state.count }}></span>
      </div>
      <button className="btn btn-neutral" onClick={handleClick}>
        +
      </button>
    </Fragment>
  );
}
