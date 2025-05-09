export const checkPassword = (password) => {
    if (!password) return false;

    // check length
    if (!(password.length >= 8)) {
        return false;
    };

    //check lowercase
    if (!(/[a-z]/.test(password))) return false;

    //check uppercase
    if (!(/[A-Z]/.test(password))) return false;

    // check number
    if (!(/\d/.test(password))) return false;

    //check symbols
    if (!(/[^A-Za-z)-9]/.test(password))) return false;

    // satisfies all the condition
    return true;
}