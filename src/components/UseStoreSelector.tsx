import { ChangeEvent, Fragment, useCallback, useEffect } from "react";
import { createStore } from "../utils/helpers/store";
import useStoreSelector from "../utils/hooks/useStoreSelector";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export default function UseStoreSelector() {
  return (
    <article className="w-screen h-screen text-center pt-40">
      <h1>카운터</h1>
      <Counter />
      <hr className="my-10" />
      <h1>텍스트</h1>
      <TextEditor />
    </article>
  );
}

const store = createStore({ count: 1, text: "hi" });

function Counter() {
  const counter = useStoreSelector(
    store,
    useCallback((state) => {
      return state.count;
    }, [])
  );

  function handleClick() {
    store.set((prev) => ({ ...prev, count: prev.count + 1 }));
  }

  useEffect(() => {
    console.log("Counter Rendered");
  });

  return (
    <Fragment>
      <span className="block countdown mb-10">
        <span style={{ "--value": counter }}></span>
      </span>
      <button className="btn btn-neutral" onClick={handleClick}>
        +
      </button>
    </Fragment>
  );
}

const textSelector = (state: ReturnType<typeof store.get>) => state.text;

function TextEditor() {
  const text = useStoreSelector(store, textSelector);

  useEffect(() => {
    console.log("Text Editor Rendered");
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    store.set((prev) => ({ ...prev, text: e.target.value }));
  }

  return (
    <Fragment>
      <h3>{text}</h3>
      <input
        value={text}
        onChange={handleChange}
        className="input input-bordered w-full max-w-xs"
      />
    </Fragment>
  );
}
