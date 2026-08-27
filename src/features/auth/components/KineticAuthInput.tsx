import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
  interpolate,
} from "react-native-reanimated";

interface KineticAuthInputProps extends TextInputProps {
  label: string;
  iconType: "mail" | "lock" | "user";
  isPassword?: boolean;
  error?: string | null;
}

export const KineticAuthInput: React.FC<KineticAuthInputProps> = ({
  label,
  iconType,
  isPassword = false,
  error,
  value,
  onChangeText,
  placeholder,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useSharedValue(0);

  const handleFocus = () => {
    setIsFocused(true);
    focusAnim.value = withTiming(1, { duration: 250, easing: Easing.out(Easing.ease) });
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusAnim.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.ease) });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      focusAnim.value,
      [0, 1],
      ["rgba(255, 255, 255, 0.85)", "#00E5FF"]
    );
    const backgroundColor = interpolateColor(
      focusAnim.value,
      [0, 1],
      ["rgba(255, 255, 255, 0.6)", "#FFFFFF"]
    );
    const elevation = interpolate(focusAnim.value, [0, 1], [0, 4]);

    return {
      borderColor,
      backgroundColor,
      elevation,
    };
  });

  return (
    <View style={styles.wrapper}>
      {/* Label superior visible especificando el campo */}
      <Text style={styles.topLabel}>{label}</Text>

      {/* Input Container Translúcido */}
      <Animated.View style={[styles.inputContainer, animatedStyle]}>
        <View style={styles.leftIconContainer}>
          {iconType === "mail" ? (
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                stroke="#64748B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M22 6l-10 7L2 6"
                stroke="#64748B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          ) : iconType === "user" ? (
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                stroke="#64748B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                stroke="#64748B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          ) : (
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"
                stroke="#64748B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M7 11V7a5 5 0 0 1 10 0v4"
                stroke="#64748B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          )}
        </View>

        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          secureTextEntry={isPassword}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
        />
      </Animated.View>

      {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    width: "100%",
  },
  topLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155", // Slate 700
    marginBottom: 6,
    paddingLeft: 2,
    letterSpacing: 0.2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1.4,
    paddingHorizontal: 14,
    height: 52,
    shadowColor: "#00E5FF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  leftIconContainer: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "400",
    paddingVertical: 0,
    height: "100%",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
    paddingLeft: 4,
  },
});
