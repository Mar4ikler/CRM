export const convertDate = (date) => {
    const splittedFullDate = date.split('T');
    const splittedTime = splittedFullDate[1].split(':');
    const convertedDate = splittedFullDate[0] + ' ' + (+splittedTime[0] + 3) + ':' + splittedTime[1];
    return convertedDate;
};
