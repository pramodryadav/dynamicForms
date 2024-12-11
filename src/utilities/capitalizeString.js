export const capitalizeString = (str) => {
    let modifiedStr = "";

    if (!str) {
        return modifiedStr
    }

    let newStr = str.replace(/_/gi, " ");
    let strArr = newStr.split(" ");


    for (let i = 0; i < strArr.length; i++) {

        modifiedStr += strArr[i].slice(0, 1).toUpperCase() + strArr[i].slice(1) + " ";
    }
    return modifiedStr;


}