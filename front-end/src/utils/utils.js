const validateEmail = (email) => {
    // const pattern = RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
    const pattern = new RegExp('^(.+)@(\\S+)$')

    if(!pattern.test(email)) {
        return false
    }

    return true
}

const confirmPassword = (password, repeatPassword) => {
    if(password.toLowerCase() === repeatPassword.toLowerCase() ){
        return true
    }

    return false
}

const validatePhoneNumber = (number) => {
    const phoneNumberPattern = new RegExp(/^(\+\d{1,3}()?)?((\(\d{1,3}\))|\d{1,3})[- .]?\d{3,4}[- .]?\d{4}$/)

    if (!phoneNumberPattern.test(number)) return false
    return true
}

const validateOnlyStringAndNumbers = (string) => {
    const pattern = new RegExp(/\w/g)

    if (pattern.test(string)) return true
    return false
}

const validateOnlyNumbers = (number) => {
    const pattern = new RegExp(/\d/g)

    if (pattern.test(number)) return true
    return false
}

const validateOnlyStrings = (string) => {
    const pattern = new RegExp(/[a-zA-Z ]/g)

    if (pattern.test(string)) return true
    return false
}

const isPalindrome = (string) => {
    // If the string not contains only letters then exit from the function
    if (!validateOnlyStrings(string)) return

    let original = string.toLowerCase().trim()
    let reverseString = [...original].reverse().join("")

    if (reverseString == original) {
        console.log('YES')
        return
    }
    else {
        console.log('NO')
    }
}

export { 
    validateEmail,
    confirmPassword,
    validatePhoneNumber,
    validateOnlyStringAndNumbers,
    validateOnlyNumbers,
    isPalindrome
}