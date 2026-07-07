import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.liquid.music",
  appName: "Mythichor",
  webDir: "dist",
  server: {
    androidScheme: "https"
  },
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: "LIGHT"
    }
  },
  android: {
    allowMixedContent: true,
    backgroundColor: "#05060a"
  }
};

export default config;
