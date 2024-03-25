import { generateRandomInt } from './generate-random-int';

const hashString = (str: string): number => {
    let hash = 0;
    if (str.length === 0) {
        return hash;
    }
    for (let i = 0; i < str.length; i++) {
        const char: number = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash;
};

export const generateExamCode = (
    examType: string,
    errorsCount: number,
    questionsCount: number
): string => {
    const currentTime = new Date().getTime();
    const randomNumber = generateRandomInt(0, 1000);
    const parameters = examType + randomNumber + errorsCount + questionsCount + currentTime;
    const hashCode = hashString(parameters);
    const uniqueCode = Math.abs(hashCode).toString().substring(0, 5);
    return uniqueCode;
};