import { Dimensions } from "react-native";
import Svg, { Defs, Line, Pattern, Rect } from "react-native-svg";
import { THEME } from "@/lib/theme";

const { width, height } = Dimensions.get("window");

export function GridBackground() {
  return (
    <Svg
      width={width}
      height={height}
      style={{ position: "absolute", opacity: 0.4 }}
    >
      <Defs>
        <Pattern id="grid" patternUnits="userSpaceOnUse" width={24} height={24}>
          <Line
            x1="0"
            y1="0"
            x2="24"
            y2="0"
            stroke={THEME.border}
            strokeWidth="4"
          />
          <Line
            x1="0"
            y1="0"
            x2="0"
            y2="24"
            stroke={THEME.border}
            strokeWidth="4"
          />
        </Pattern>
      </Defs>

      <Rect width="100%" height="100%" fill="url(#grid)" />
    </Svg>
  );
}
