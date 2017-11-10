import { findDOMNode } from "react-dom";
import wrapDisplayName from "recompose/wrapDisplayName";
import setDisplayName from "recompose/setDisplayName";
import mapPropsOnEvent from "./mapPropsOnEvent";
import getOffsetToRoot from "./getOffsetToRoot";

const withOffsetToRoot = throttle => BaseComponent => {
  const WithOffsetToRoot = mapPropsOnEvent(
    () => window,
    "resize",
    (e, self) => ({ offsetToRoot: getOffsetToRoot(findDOMNode(self)) }),
    throttle,
    true
  )(BaseComponent);

  if (process.env.NODE_ENV !== "production") {
    return setDisplayName(wrapDisplayName(BaseComponent, "withMousePosition"))(
      WithOffsetToRoot
    );
  }

  return WithOffsetToRoot;
};

export default withOffsetToRoot;
