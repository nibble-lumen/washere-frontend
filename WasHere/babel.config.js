module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "module:react-native-dotenv",
      {
        allowUndefined: true,
        moduleName: "@env",
        path: ".env",
        safe: false,
      },
    ],
  ],
};
