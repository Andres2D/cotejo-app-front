export const calculateArrAVG = (values: any[]) => {
    const valuesSum = values.reduce((a, b) => Number(a) + Number(b), 0);
    const overall = (Number(valuesSum) / values.length) || 0;
    return overall.toFixed(0);
} 
