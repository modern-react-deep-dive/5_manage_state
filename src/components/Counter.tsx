import { State, get, set } from "../utils/helpers/counter";

export default function Counter() {
  const state = get();

  function handleClick() {
    set((prev: State) => ({ counter: prev.counter + 1 }));
  }

  return (
    <article className="w-screen h-screen text-center pt-40">
      <span className="block countdown mb-10">
        <span style={{ "--value": state.counter }}></span>
      </span>
      <button className="btn btn-neutral" onClick={handleClick}>
        +
      </button>
    </article>
  );
}
