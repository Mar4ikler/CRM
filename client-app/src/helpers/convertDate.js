export const convertDate = (date) => {
    const splittedFullDate = date.split('T');
    const splittedTime = splittedFullDate[1].split(':');
    const convertedDate = +splittedTime[0] + 3 + ':' + splittedTime[1] + ' ' + splittedFullDate[0];
    return convertedDate;
};
