import user from "./userData";
const processResponceTime = (responceTime: number, resText: string) => {
  return resText.replace(/<span>(.*?)<\/span>/, `<span>${responceTime}</span>`);
};

const processTarif = (label: string, resText: string, needClass: boolean = false) => {
    return resText.replace(/<span>(.*?)<\/span>/, `<span class="${needClass ? label : ''}" >${label}</span>`);
};

const checkRoles = () => {
    const userData = user.getUserData();
    const privRoles = ['sla_manager', 'administrator']
    const includesPrivilagedRoles = Array.isArray(userData.roles) ? userData.roles.reduce((status: boolean, item: { slug: string, title: string }) => {
        if (privRoles.includes(item.slug)) {
            status = true;
        }
        return status
    }, false) : false;

    return includesPrivilagedRoles
}

const getStartDate = (period: string): Date | null => {
    const now = new Date();
    switch (period) {
        case 'this_week': {
            const dayOfWeek = now.getDay();
            return new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
        }
        case 'this_month': {
            return new Date(now.getFullYear(), now.getMonth(), 1);
        }
        case 'last_3_month': {
            return new Date(now.getFullYear(), now.getMonth() - 3, 1);
        }
        default:
            return null;
    }
};

const firstResponceTimeInMilliseconds = (item: NestedObject) => {
    const historyTime = (item.changelog as NestedObject)?.histories as NestedObject[]
    const startDateTime = (item.fields as NestedObject)?.created ? new Date((item.fields as NestedObject)?.created as string) : null
    let firstResponceTime = 0
    if(startDateTime && historyTime.length > 0){
        historyTime.forEach((event)=>{
            const eventsItems: NestedObject[] = event.items as NestedObject[]
            if(eventsItems.length > 0){
                eventsItems.forEach(item=>{
                    if(item.from as number == 10199 && item.to as number == 10234){
                        const eventTime = event.created ? new Date(event.created as string) : null
                        if(eventTime){
                            firstResponceTime = eventTime.getTime() - startDateTime.getTime()
                        }
                    }
                })
            }
        })
    }
    return firstResponceTime
}

export default {
    processResponceTime,
    processTarif,
    checkRoles,
    getStartDate,
    firstResponceTimeInMilliseconds
};
