import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const SvgFrame = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    {...props}
  >
    <G fill="#6226CF" clipPath="url(#Frame_svg__a)">
      <Path d="M14.07 12.956c-.005-.005-.006-.01-.01-.015L9.544 8.426V5.59a.79.79 0 0 0-.232-.56L4.567.233a.791.791 0 0 0-1.35.56v2.372H.79a.79.79 0 0 0-.56 1.35l4.8 4.8a.79.79 0 0 0 .559.231h2.836l4.515 4.514c.004.005.01.006.015.01a.778.778 0 0 0 1.088 0 .78.78 0 0 0 .025-1.113Z" />
      <Path d="M13.5 0c-2.024 0-3.938.515-5.66 1.32l2.426 2.426a10.226 10.226 0 0 1 3.234-.53c5.67 0 10.283 4.614 10.283 10.284 0 5.67-4.613 10.283-10.283 10.283-5.67 0-10.283-4.613-10.283-10.283 0-1.13.19-2.216.529-3.235L1.319 7.84C.515 9.562 0 11.476 0 13.499 0 20.916 6.085 27 13.5 27S27 20.916 27 13.5C27 6.086 20.915 0 13.5 0Z" />
      <Path d="M13.5 6.38c-.836 0-1.627.172-2.373.438v.953L12.956 9.6c.18-.025.358-.055.544-.055a3.96 3.96 0 0 1 3.955 3.955 3.96 3.96 0 0 1-3.955 3.955A3.96 3.96 0 0 1 9.545 13.5c0-.186.03-.365.055-.544l-1.829-1.83h-.953c-.266.747-.437 1.538-.437 2.374a7.127 7.127 0 0 0 7.12 7.12 7.127 7.127 0 0 0 7.118-7.12A7.127 7.127 0 0 0 13.5 6.38Z" />
    </G>
    <Defs>
      <ClipPath id="Frame_svg__a">
        <Path fill="#fff" d="M0 0h27v27H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgFrame;
