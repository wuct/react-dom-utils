import wrapDisplayName from "recompose/wrapDisplayName";
import setDisplayName from "recompose/setDisplayName";
import pick from "lodash/pick";
import mapPropsOnEvent from "./mapPropsOnEvent";

export const pickedProps = [
  "innerWidth",
  "innerHeight",
  "outerWidth",
  "outerHeight"
];

const withWindowSize = throttle => BaseComponent => {
  const WithWindowSize = mapPropsOnEvent(
    () => window,
    "resize",
    () => ({ windowSize: pick(window, pickedProps) }),
    throttle,
    true
  )(BaseComponent);

  if (process.env.NODE_ENV !== "production") {
    return setDisplayName(wrapDisplayName(BaseComponent, "withWindowSize"))(
      WithWindowSize
    );
  }

  return WithWindowSize;
};

export default withWindowSize;
