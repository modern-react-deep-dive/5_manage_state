import { Dispatch, useReducer } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Initializer<T> = T extends any ? T | ((prev: T) => T) : never;

function useStateWithUseReducer<T>(
  initialState: T
): [T, Dispatch<Initializer<T>>] {
  const [state, dispatch] = useReducer((prev: T, action: Initializer<T>) => {
    return typeof action === "function" ? action(prev) : action;
  }, initialState);

  return [state, dispatch];
}

export default function UseStateWithUseReducer() {
  const [count, setCount] = useStateWithUseReducer(0);

  return (
    <article className="w-screen h-screen text-center pt-40">
      <span className="block countdown mb-10">
        <span style={{ "--value": count }}></span>
      </span>
      <button
        className="btn btn-neutral"
        onClick={() =>
          setCount((prev) => {
            return prev + 1;
          })
        }
      >
        +
      </button>
    </article>
  );
}
