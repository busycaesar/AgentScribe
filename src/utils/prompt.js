const inquirer = require("inquirer").default;

// Ask the user to confirm an action. Resolves to a boolean.
async function confirmAction(message, defaultValue = false) {
  const { confirmed } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmed",
      message,
      default: defaultValue,
    },
  ]);
  return confirmed;
}

module.exports = {
  confirmAction,
};
