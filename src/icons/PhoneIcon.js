import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgPhoneIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={29}
    fill="none"
    {...props}
  >
    <Path
      fill="#6226CF"
      d="m27.527 20.742-3.953-3.906c-1.412-1.396-3.812-.837-4.377.976-.423 1.256-1.835 1.954-3.106 1.675-2.824-.698-6.636-4.326-7.342-7.256-.423-1.256.424-2.65 1.695-3.07 1.835-.558 2.4-2.93.988-4.325L7.479.93c-1.13-.976-2.824-.976-3.812 0L.984 3.58c-2.683 2.791.282 10.186 6.918 16.744s14.12 9.627 16.943 6.837l2.683-2.651c.988-1.117.988-2.79 0-3.768Z"
    />
  </Svg>
);
export default SvgPhoneIcon;
