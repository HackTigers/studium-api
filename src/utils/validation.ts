import Constants from "./constants";

export function validateEnv() {
  const constants = Constants;
  let valid = true;

  function checkEnvVariables(obj: any, parentKey: string = "") {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const envKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof obj[key] === "object" && obj[key] !== null) {
          // Recursively check nested objects
          checkEnvVariables(obj[key], envKey);
        } else {
          if (!process.env[key]) {
            console.error(`Environment variable ${key} is missing`);
            valid = false;
          }
        }
      }
    }
  }

  checkEnvVariables(constants);

  return valid;
}
