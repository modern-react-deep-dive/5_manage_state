import { Fragment } from "react";
import ContextCounter from "./components/ContextCounter";
import ContextInput from "./components/ContextInput";
import { CounterStoreProvider } from "./utils/providers/CounterStoreProvider";
// import NewCounter from "./components/NewCounter";
// import UseStoreSelector from "./components/UseStoreSelector";
// import Counter from "./components/Counter";
// import CounterWithStore from "./components/CounterWithStore";
// import UseReducerWithUseState from "./components/UseReducerWithUseState";
// import UseStateWithUseReducer from "./components/UseStateWithUseReducer";
// import SimpleClassComponentWithContextAPI from "./components/SimpleClassComponentWithContextAPI";
// import SimpleFluxPattern from "./components/SimpleFluxPattern";
// import PastContextUsage from "./components/PastContextUsage";

function App() {
  return (
    <Fragment>
      {/* <SimpleFluxPattern /> */}
      {/* <PastContextUsage /> */}
      {/* <SimpleClassComponentWithContextAPI /> */}
      {/* <UseStateWithUseReducer /> */}
      {/* <UseReducerWithUseState /> */}
      {/* <Counter /> */}
      {/* <CounterWithStore /> */}
      {/* <UseStoreSelector /> */}
      {/* <NewCounter /> */}

      <ContextCounter />
      <ContextInput />

      <CounterStoreProvider initialState={{ count: 10, text: "hello1" }}>
        <ContextCounter />
        <ContextInput />

        <CounterStoreProvider initialState={{ count: 20, text: "welcome" }}>
          <ContextCounter />
          <ContextInput />
        </CounterStoreProvider>
      </CounterStoreProvider>
    </Fragment>
  );
}

export default App;
