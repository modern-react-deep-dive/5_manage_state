import { Component, Fragment, ReactNode, createContext } from "react";

type Counter = {
  count: number;
};

const CounterContext = createContext<Counter | undefined>(undefined);

class CounterComponent extends Component {
  render(): ReactNode {
    return (
      <CounterContext.Consumer>
        {(state) => (
          <span className="block countdown mb-10">
            <span style={{ "--value": state?.count || 0 }}></span>
          </span>
        )}
      </CounterContext.Consumer>
    );
  }
}

class DummyParent extends Component {
  render(): ReactNode {
    return (
      <Fragment>
        <CounterComponent />
      </Fragment>
    );
  }
}

export default class SimpleClassComponentWithContextAPI extends Component<
  unknown,
  Counter
> {
  state = { count: 0 };

  componentDidMount(): void {
    this.setState({ count: 1 });
  }

  handleClick = () => {
    this.setState((state) => ({ count: state.count + 1 }));
  };

  render(): ReactNode {
    return (
      <CounterContext.Provider value={this.state}>
        <article className="w-screen h-screen text-center pt-40">
          <DummyParent />
          <button className="btn btn-neutral" onClick={this.handleClick}>
            +
          </button>
        </article>
      </CounterContext.Provider>
    );
  }
}
