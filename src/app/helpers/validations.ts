export const toFindDuplicatesStringsArr 
    = (arry: string[]) => 
        arry.filter((item, index) => arry.indexOf(item) !== index);
