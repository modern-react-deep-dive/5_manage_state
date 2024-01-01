import { Fragment, useMemo } from "react";
import { createStore } from "../utils/helpers/store";
import useSubscription from "../utils/hooks/useSubscription";

const store = createStore({ count: 0 });

export default function NewCounter() {
  const subscription = useMemo(
    () => ({
      getCurrentValue: () => store.get(),
      subscribe: (callback: () => void) => {
        const unsubscribe = store.subscribe(callback);
        return () => unsubscribe();
      },
    }),
    []
  );

  const value = useSubscription(subscription);

  return <Fragment>{JSON.stringify(value)}</Fragment>;
}
