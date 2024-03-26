import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const SvgLocationIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={22}
    fill="none"
    {...props}
  >
    <G clipPath="url(#LocationIcon_svg__a)">
      <Path
        fill="#9F9F9F"
        d="M10.5.705c-4.342 0-7.875 3.558-7.875 7.932 0 6.215 7.135 12.632 7.438 12.902a.655.655 0 0 0 .874 0c.303-.27 7.438-6.687 7.438-12.902 0-4.374-3.533-7.932-7.875-7.932Zm0 12.25A4.38 4.38 0 0 1 6.125 8.58 4.38 4.38 0 0 1 10.5 4.205a4.38 4.38 0 0 1 4.375 4.375 4.38 4.38 0 0 1-4.375 4.375Z"
      />
    </G>
    <Defs>
      <ClipPath id="LocationIcon_svg__a">
        <Path fill="#fff" d="M0 .705h21v21H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgLocationIcon;
