import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComingSoonIcon = ({ColorFill}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
  >
    <Path
      fill={ColorFill}
      d="M17.98.547c-.091-.385-.514-.647-.898-.51L.457 5.903a.703.703 0 0 0-.456.617.716.716 0 0 0 .397.66l6.438 3.004 3.142-3.142c.623-.622 1.616.34.978.978l-3.142 3.142s3.001 6.43 3.007 6.44a.74.74 0 0 0 .624.396c.285.014.55-.205.652-.46L17.964.918a.647.647 0 0 0 .017-.372Z"
    />
  </Svg>
);
export default SvgComingSoonIcon;
