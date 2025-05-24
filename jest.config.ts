import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testEnvironment: "jsdom",
};

export default config;
