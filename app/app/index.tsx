import { useTheme } from "@/context/ThemeContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Feature = {
  icon: string;
  text: string;
  description: string;
};

const features: Feature[] = [
  { icon: "📸", text: "Restore Photos", description: "In Excellent Quality" },
  { icon: "🌟", text: "Generative Fill", description: "Smart Expand" },
  { icon: "✂", text: "Remove Objects", description: "Clean Removal" },
];

function WelcomeScreen() {
  const colors = useThemeColors();
  const { currentTheme } = useTheme();

  return (
    <SafeAreaView
      className={`flex-1 ${
        currentTheme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <View className="items-center px-5 pt-10">
        <Image
          source={require("../assets/images/landing.png")}
          className="size-[140px] mr-16"
          resizeMode="contain"
        />

        <Text
          className={`text-[28px] font-bold text-center mb-3 ${
            currentTheme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          IMAGEine
        </Text>

        <Text
          className={`text-base text-center mb-7 leading-6 ${
            currentTheme === "dark" ? "text-gray-300/80" : "text-gray-600"
          }`}
        >
          It&apos;s 2025, let AI do the Photoshopping for you. Recolor, restore,
          fill and remove objects with simple clicks.
        </Text>

        <View className="flex-row flex-wrap justify-between px-[5px]">
          {features.map((feature, idx) => {
            return (
              <View
                key={idx}
                className={`w-[48%] rounded-2xl p-4 mb-3 ${
                  currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <Text className="text-[26px] mb-3">{feature.icon}</Text>

                <View className="w-full">
                  <Text
                    className={`text-[18px] font-semibold mb-1 ${
                      currentTheme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.text}
                  </Text>

                  <Text
                    className={`text-sm ${
                      currentTheme === "dark"
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View className="p-5 w-full">
        <TouchableOpacity
          className="h-[54px] rounded-xl border-[1.5px] justify-center items-center mb-4"
          style={{ borderColor: colors.primary }}
          onPress={() => router.push("/sign-in")}
        >
          <Text
            className="text-base font-semibold"
            style={{ color: colors.primary }}
          >
            Log In
          </Text>
        </TouchableOpacity>

        <LinearGradient
          colors={["#4F46E5", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 12, marginBottom: 16, height: 54 }}
        >
          <TouchableOpacity
            className="h-[54px] justify-center"
            onPress={() => router.push("/signup")}
          >
            <Text className="text-base text-center font-semibold text-white">
              Create Account
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <Text
          className={`text-center text-sm mt-2 ${
            currentTheme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Transform images like a Pro starting today
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;
