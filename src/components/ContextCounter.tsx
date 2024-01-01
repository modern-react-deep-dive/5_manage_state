import { useCallback, useEffect, useId } from "react";
import {
  CounterStore,
  useCounterContextSelector,
} from "../utils/providers/CounterStoreProvider";

export default function ContextCounter() {
  const id = useId();
  const [counter, setStore] = useCounterContextSelector(
    useCallback((state: CounterStore) => state.count, [])
  );

  function handleClick() {
    setStore((prev) => ({ ...prev, count: prev.count + 1 }));
  }

  useEffect(() => {
    console.log(`${id} Counter Rendered`);
  });

  return (
    <div>
      {counter} <button onClick={handleClick}>+</button>
    </div>
  );
}
