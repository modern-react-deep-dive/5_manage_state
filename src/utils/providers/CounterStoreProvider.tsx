/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useRef,
} from "react";
import { Store, createStore } from "../helpers/store";
import useSubscription from "../hooks/useSubscription";

export type CounterStore = {
  count: number;
  text: string;
};

export const CounterStoreContext = createContext<Store<CounterStore>>(
  createStore<CounterStore>({ count: 0, text: "hello" })
);

export function CounterStoreProvider({
  initialState,
  children,
}: PropsWithChildren<{
  initialState: CounterStore;
}>) {
  const storeRef = useRef<Store<CounterStore>>();

  if (!storeRef.current) {
    storeRef.current = createStore(initialState);
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
}

export const useCounterContextSelector = <State extends unknown>(
  selector: (state: CounterStore) => State
) => {
  const store = useContext(CounterStoreContext);
  const subscribe = useSubscription(
    useMemo(
      () => ({
        getCurrentValue: () => selector(store.get()),
        subscribe: store.subscribe,
      }),
      [store, selector]
    )
  );

  return [subscribe, store.set] as const;
};
