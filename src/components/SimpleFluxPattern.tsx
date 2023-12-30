import { useReducer } from "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

type StoreState = {
  count: number;
};

type Action = {
  /**
   * 어떠한 작업을 처리할 액션
   */
  type: "add";
  /**
   * {@link type} 액션 발생 시 포함시킬 데이터
   */
  payload: number;
};

function reducer(prevState: StoreState, action: Action) {
  const { type: ActionType } = action;

  if (ActionType === "add") {
    return {
      count: prevState.count + action.payload,
    };
  }

  throw new Error(`Unexpected Action [${ActionType}]`);
}

export default function SimpleFluxPattern() {
  const [state, dispatcher] = useReducer(reducer, { count: 0 });

  function handleClick() {
    dispatcher({ type: "add", payload: 1 });
  }

  return (
    <article className="w-screen h-screen text-center pt-40">
      <span className="block countdown mb-10">
        <span style={{ "--value": state.count }}></span>
      </span>
      <button className="btn btn-neutral" onClick={handleClick}>
        +
      </button>
    </article>
  );
}
