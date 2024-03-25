export const validator = {
    isRequired: (...values) => {
        return values.every((value) => value != null && value !== '');
    },
    isLengthValid: (value) => {
        return value.length < 101 && value.length > 0;
    },
    isValidLogin: (value) => {
        return /^[a-zA-Z0-9_-]{3,16}$/.test(value);
    },
    isValidPassword: (value) => {
        return /^[a-zA-Z0-9_\-!@#$%^&*()\-_+={}[\]:;,<.>]{3,20}$/.test(value);
    },
    isValidFullName: (value) => {
        return /^[А-ЯЁ][а-яё]+\s[А-ЯЁ]\.[А-ЯЁ]\.$/.test(value);
    },
};
