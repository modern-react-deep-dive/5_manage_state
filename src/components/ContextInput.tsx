import { ChangeEvent, useCallback, useEffect, useId } from "react";
import {
  CounterStore,
  useCounterContextSelector,
} from "../utils/providers/CounterStoreProvider";

export default function ContextInput() {
  const id = useId();
  const [text, setStore] = useCounterContextSelector(
    useCallback((state: CounterStore) => state.text, [])
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setStore((prev) => ({ ...prev, text: e.target.value }));
  }

  useEffect(() => {
    console.log(`${id} Counter Rendered`);
  });

  return (
    <div>
      <input value={text} onChange={handleChange} />
    </div>
  );
}
