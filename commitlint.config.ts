import type { UserConfig } from "@commitlint/types";

// Conventional Commits: https://www.conventionalcommits.org
const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // GitHub truncates PR and commit titles longer than 72 characters.
    "header-max-length": [2, "always", 72],
  },
};

export default config;
