/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { useEffect, useState } from "react";
import { Store } from "../helpers/store";

export default function useStoreSelector<
  State extends unknown,
  Value extends unknown
>(store: Store<State>, selector: (state: State) => Value) {
  // const [state, setState] = useState(store.get());
  const [state, setState] = useState(() => selector(store.get()));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const value = selector(store.get());
      setState(value);
    });

    return unsubscribe;
  }, [store, selector]);

  // return selector(state);
  return state;
}
