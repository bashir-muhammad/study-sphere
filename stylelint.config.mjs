/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard"],
  overrides: [
    {
      files: ["**/*.module.css"],
      rules: {
        "selector-class-pattern": null,
      },
    },
  ],
};
