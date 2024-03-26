import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgDropDownOpenIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={31}
    fill="none"
    {...props}
  >
    <Path
      fill="#9F9F9F"
      d="m15.5 17.88-6.607-6.877a1.078 1.078 0 0 0-1.568 0 1.187 1.187 0 0 0 0 1.632l7.391 7.692c.216.225.5.338.784.338.284 0 .567-.113.784-.338l7.391-7.692a1.188 1.188 0 0 0 0-1.632 1.079 1.079 0 0 0-1.568 0L15.5 17.879Z"
    />
  </Svg>
);
export default SvgDropDownOpenIcon;
