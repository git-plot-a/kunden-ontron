"use client"

import localStorageVariables from '../constants/local.storage'


const setLastPage = (lastVisitedPage: string | undefined) => {
    if (lastVisitedPage) {
        localStorage.setItem(localStorageVariables.LAST_VISITED_PAGE, lastVisitedPage)
    }
}

const resetLastPage = () => {
    localStorage.removeItem(localStorageVariables.LAST_VISITED_PAGE)
}

const getLastPage = () => {
    return localStorage.getItem(localStorageVariables.LAST_VISITED_PAGE)
}

const setToken = (token: string | undefined) => {
    if (token) {
        localStorage.setItem(localStorageVariables.USER_TOKEN_VALIABLE, token)
    }
}

const setAvatar = (avatar: string) => {
    if (avatar) {
        localStorage.setItem(localStorageVariables.USER_AVATAR_VARIABLE, JSON.stringify(avatar))
    }
}

const getToken = () => {
    return localStorage.getItem(localStorageVariables.USER_TOKEN_VALIABLE)
}

const getAvatar = () => {
    try {
        return JSON.parse(localStorage.getItem(localStorageVariables.USER_AVATAR_VARIABLE) as string)
    } catch (e) {
        console.log(e)
        return localStorage.getItem(localStorageVariables.USER_AVATAR_VARIABLE)
    }
}



const resetToken = () => {
    localStorage.removeItem(localStorageVariables.USER_TOKEN_VALIABLE)
}

const setEnterData = (login: string, password: string) => {
    localStorage.setItem(localStorageVariables.USER_LOGIN_VARIABLE, login)
    localStorage.setItem(localStorageVariables.USER_PASSWORD_VARIABLE, password)
}

const getSavedEmail = () => {
    return localStorage.getItem(localStorageVariables.USER_LOGIN_VARIABLE as string)
}

const getSavedPassword = () => {
    return localStorage.getItem(localStorageVariables.USER_PASSWORD_VARIABLE)
}

// const headerWithAuth = (headers: object) => {
//     const token = getToken()
//     return token
//         ? {
//             'headers': {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//                 ...headers,
//             },
//         }
//         : null
// }

const setID = (id: string | number) => {
    if (id) {
        localStorage.setItem(localStorageVariables.USER_ID_VARIABLE, id as string)
    }
}

const resetID = () => {
    localStorage.removeItem(localStorageVariables.USER_ID_VARIABLE)
}

const resetAvatar = () => {
    localStorage.removeItem(localStorageVariables.USER_AVATAR_VARIABLE)
}

const getUserID = () => {
    return localStorage.getItem(localStorageVariables.USER_ID_VARIABLE)
}

// const setUserData = (user) => {
//     if (user.user_email) {
//         localStorage.setItem(
//             `${globalVarsProcess.getEnvValue('TAG', 'unknown')}-${localStorageVariables.CURRENT_USER}`,
//             JSON.stringify(user),
//         )
//     }
// }

// const getUserData = () => {
//     return JSON.parse(localStorage.getItem(`${globalVarsProcess.getEnvValue('TAG', 'unknown')}-${localStorageVariables.CURRENT_USER}`))
// }
// const resetUserData = () => {
//     localStorage.removeItem(`${globalVarsProcess.getEnvValue('TAG', 'unknown')}-${localStorageVariables.CURRENT_USER}`)
// }

const resetAllData = () => {
    resetAvatar();
    resetID();
    resetToken();
    // resetUserData();
}

export default {
    setToken,
    getToken,
    resetToken,
    setEnterData,
    getSavedEmail,
    getSavedPassword,
    // headerWithAuth,
    setID,
    resetID,
    getUserID,
    setAvatar,
    resetAvatar,
    getAvatar,
    // setUserData,
    // getUserData,
    // resetUserData,
    resetAllData,
    setLastPage,
    resetLastPage,
    getLastPage
}
