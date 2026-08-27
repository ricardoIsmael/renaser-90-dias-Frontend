import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TextInputProps,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface AnimatedAuthInputProps extends TextInputProps {
  label: string;
  iconType: "mail" | "lock";
  isPassword?: boolean;
  error?: string | null;
}

export const AnimatedAuthInput: React.FC<AnimatedAuthInputProps> = ({
  label,
  iconType,
  isPassword = false,
  error,
  value,
  onChangeText,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const focusAnim = useSharedValue(0);

  const handleFocus = () => {
    focusAnim.value = withTiming(1, { duration: 250, easing: Easing.out(Easing.ease) });
  };

  const handleBlur = () => {
    focusAnim.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.ease) });
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      borderColor: focusAnim.value === 1 ? "#2563EB" : error ? "#EF4444" : "#E2E8F0",
      backgroundColor: focusAnim.value === 1 ? "#FFFFFF" : "#F8FAFC",
      shadowColor: "#38BDF8",
      shadowOpacity: focusAnim.value * 0.35,
      shadowRadius: focusAnim.value * 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: focusAnim.value * 3,
    };
  });

  return (
    <View style={styles.wrapper}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Input Container */}
      <Animated.View style={[styles.inputContainer, animatedContainerStyle]}>
        {/* Left Icon */}
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
                d="m22 6-10 7L2 6"
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

        {/* Text Input */}
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          secureTextEntry={isPassword && !showPassword}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
        />

        {/* Password Visibility Toggle */}
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword((prev) => !prev)}
            hitSlop={12}
            style={styles.rightIconContainer}
          >
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              {showPassword ? (
                <>
                  <Path
                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                    stroke="#2563EB"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="m1 1 22 22"
                    stroke="#2563EB"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              ) : (
                <>
                  <Path
                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    stroke="#94A3B8"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    stroke="#94A3B8"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}
            </Svg>
          </Pressable>
        )}
      </Animated.View>

      {/* Error Message */}
      {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
    width: "100%",
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#64748B",
    marginBottom: 6,
    paddingLeft: 2,
    letterSpacing: 0.1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1.2,
    paddingHorizontal: 14,
    height: 50,
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
  rightIconContainer: {
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
    paddingLeft: 4,
  },
});
