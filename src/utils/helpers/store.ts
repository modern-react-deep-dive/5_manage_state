/* eslint-disable @typescript-eslint/no-explicit-any */
type Initializer<T> = T extends any ? T | ((prev: T) => T) : never;

export type Store<State> = {
  /**
   * 최신 값을 항상 가져와야 하므로 함수로 구현
   */
  get: () => State;
  /**
   * 기존에 리액트 개발자가 널리 사용하고 있는 useState와 동일하게 값 또는 함수를 받을 수 있도록 만듦
   */
  set: (action: Initializer<State>) => State;
  /**
   * 값이 변경될 때마다 자신에게 등록된 모든 callback을 실행하게 함. 따라서 자기 자신을 렌더링하는 코드를 추가해서 컴포넌트가 리렌더링 할 수 있게 함.
   */
  subscribe: (callback: () => void) => () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const createStore = <State extends unknown>(
  initialState: Initializer<State>
): Store<State> => {
  let state =
    typeof initialState !== "function" ? initialState : initialState();

  const callbacks = new Set<() => void>();

  const get = () => state;
  const set = (nextState: State | ((prev: State) => State)) => {
    state =
      typeof nextState === "function"
        ? (nextState as (prev: State) => State)
        : nextState;

    callbacks.forEach((callback) => {
      callback();
    });

    return state;
  };

  const subscribe = (callback: () => void) => {
    callbacks.add(callback);

    return () => {
      callbacks.delete(callback);
    };
  };

  return { get, set, subscribe };
};
