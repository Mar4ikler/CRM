/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-return */
function isValidAnswer(answer: any): boolean {
    // Проверяем, что объект содержит необходимые поля
    return (
        typeof answer === 'object' &&
        answer.hasOwnProperty('isCorrect') &&
        typeof answer.isCorrect === 'boolean' &&
        answer.hasOwnProperty('text') &&
        typeof answer.text === 'string'
    );
}

// Проверка на соответствие типу GeneralQuestion
export function isValidGeneralQuestion(question: any): boolean {
    // Проверяем, что объект содержит необходимые поля и их типы
    return (
        typeof question === 'object' &&
        question.hasOwnProperty('question') &&
        typeof question.question === 'string' &&
        question.hasOwnProperty('answers') &&
        Array.isArray(question.answers) &&
        question.answers.every((answer: any) => isValidAnswer(answer))
    );
}
