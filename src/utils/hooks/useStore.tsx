/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { useEffect, useState } from "react";
import { Store } from "../helpers/store";

export default function useStore<State extends unknown>(store: Store<State>) {
  const [state, setState] = useState<State>(() => store.get());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.get());
    });

    return unsubscribe;
  }, [store]);

  return [state, store.set] as const;
}
