import constants from "./constants";

export default new class Utils {
      /**
     * Generating GUID
     * @param length number
     */
       generateGuid(length: number) {
        let result = '';
        let characters = constants.GUID_CHARACTER_SET;
        let charactersLength = characters.length;
        for (let iterator = 0; iterator < length; iterator++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    /**
     * Generating password
     * @param length number
     */
    generatePassword(length: number) {
        let result = '';
        let characters = constants.COGNITO.TEMP_PASSWORD_CHARACTER_SET;
        let charactersLength = characters.length;
        for (let iterator = 0; iterator < length; iterator++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}