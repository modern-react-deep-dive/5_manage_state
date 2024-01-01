/* eslint-disable @typescript-eslint/ban-types */

import { useDebugValue, useEffect, useState } from "react";

/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
export default function useSubscription<Value>({
  getCurrentValue,
  subscribe,
}: {
  getCurrentValue: () => Value;
  subscribe: (callback: () => void) => () => void;
}): Value {
  const [state, setState] = useState(() => ({
    getCurrentValue,
    subscribe,
    value: getCurrentValue(),
  }));

  let valueToReturn = state.value;

  if (
    state.getCurrentValue !== getCurrentValue ||
    state.subscribe !== subscribe
  ) {
    valueToReturn = getCurrentValue();

    setState({
      getCurrentValue,
      subscribe,
      value: valueToReturn,
    });
  }

  useDebugValue(valueToReturn);

  useEffect(() => {
    let didUnsubscribe = false;

    const checkForUpdates = () => {
      if (didUnsubscribe) {
        return;
      }

      const value = getCurrentValue();

      setState((prevState) => {
        if (
          prevState.getCurrentValue !== getCurrentValue ||
          prevState.subscribe !== subscribe
        ) {
          return prevState;
        }

        if (prevState.value === value) {
          return prevState;
        }

        return { ...prevState, value };
      });
    };

    const unsubscribe = subscribe(checkForUpdates);

    checkForUpdates();

    return () => {
      didUnsubscribe = true;
      unsubscribe();
    };
  }, [getCurrentValue, subscribe]);

  return valueToReturn;
}
