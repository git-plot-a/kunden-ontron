const processResponceTime = (responceTime: number, resText: string) => {
  return resText.replace(/<span>(.*?)<\/span>/, `<span>${responceTime}</span>`);
};

const processTarif = (label: string, resText: string, needClass: boolean = false) => {
    return resText.replace(/<span>(.*?)<\/span>/, `<span class="${needClass ? label : ''}" >${label}</span>`);
};

export default {
    processResponceTime,
    processTarif
};
