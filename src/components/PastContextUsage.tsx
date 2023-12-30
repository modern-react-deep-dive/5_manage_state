import React from "react";
import PropTypes from "prop-types";

interface ContextType {
  name: string;
  age: number;
}
/**
 *  첫 번째로 상위 컴포넌트가 렌더링되면, getChildContext가 호출됨가 동시에 shouldComponentUpdate가 항상 true를 반환한다.
 *  https://ko.legacy.reactjs.org/docs/react-component.html
 *  https://github.com/acdlite/rfcs/blob/1e25818e47037a7de80e95793c4129e9887d6f2b/text/0000-new-version-of-context.md
 */

class PastContextUsage extends React.Component {
  static childContextTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
  };

  getChildContext(): ContextType {
    return {
      name: "윤태성",
      age: 31,
    };
  }

  render() {
    return <ChildComponent />;
  }
}

function ChildComponent(_: unknown, context: ContextType) {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <p>Name: {context.name}</p>
      <p>Age: {context.age}</p>
    </div>
  );
}

ChildComponent.contextTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
};

export default PastContextUsage;
