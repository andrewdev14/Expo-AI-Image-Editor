import { colors } from "@/constants/colors";
import { useTheme } from "@/context/ThemeContext";

export function useThemeColors() {
  const { currentTheme } = useTheme();

  return colors[currentTheme];
}
