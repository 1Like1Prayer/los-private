import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgDropDownCloseIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={31}
    fill="none"
    {...props}
  >
    <Path
      fill="#6226CF"
      d="m15.5 13.517-6.607 6.876c-.433.45-1.135.45-1.568 0a1.187 1.187 0 0 1 0-1.632l7.391-7.692c.216-.226.5-.338.784-.338.284 0 .567.112.784.338l7.391 7.692c.433.45.433 1.181 0 1.632-.433.45-1.135.45-1.568 0L15.5 13.516Z"
    />
  </Svg>
);
export default SvgDropDownCloseIcon;
