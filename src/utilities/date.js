/**
 * 
 * @param {Date} startDate Start Date
 * @param {Date} endDate End Date
 */
export const timeDifferenceString = (startDate, endDate) => {
    const diffSeconds = (endDate - startDate)/1000;
    
    let finalDiff = diffSeconds;
    let unit = 's';
    if(diffSeconds/(60 * 60 * 24) > 1) {
        finalDiff = diffSeconds/(60 * 60 * 24);
        unit = 'd';
    } else if (diffSeconds/(60 * 60) > 1) {
        finalDiff = diffSeconds/(60 * 60);
        unit = 'h';
    } else if (diffSeconds/60 > 1) {
        finalDiff = diffSeconds/60;
        unit = 'm';
    }
    
    return `${finalDiff.toFixed(0)} ${unit}`
}