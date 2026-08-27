import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TextInputProps,
} from "react-native";

interface AuthInputProps extends TextInputProps {
  label: string;
  iconText: string;
  isPassword?: boolean;
  error?: string | null;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  iconText,
  isPassword = false,
  error,
  value,
  onChangeText,
  placeholder,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.wrapper}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Input Container */}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          Boolean(error) && styles.inputError,
        ]}
      >
        {/* Left Icon */}
        <View style={styles.leftIconContainer}>
          <Text style={[styles.iconText, isFocused && styles.iconFocused]}>
            {iconText}
          </Text>
        </View>

        {/* Text Input */}
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#475569"
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
            <Text style={styles.toggleText}>
              {showPassword ? "👁️" : "🙈"}
            </Text>
          </Pressable>
        )}
      </View>

      {/* Error Message */}
      {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 13.5,
    fontWeight: "500",
    color: "#94A3B8",
    marginBottom: 8,
    paddingLeft: 2,
    letterSpacing: 0.2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D1527", // Deep obsidian navy
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "#1E293B",
    paddingHorizontal: 14,
    height: 52,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  inputFocused: {
    borderColor: "#3B82F6",
    backgroundColor: "#0F1A30",
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#180D14",
  },
  leftIconContainer: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 16,
    color: "#64748B",
  },
  iconFocused: {
    color: "#38BDF8",
  },
  textInput: {
    flex: 1,
    color: "#F8FAFC",
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
  toggleText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: "#F87171",
    marginTop: 5,
    paddingLeft: 4,
  },
});
