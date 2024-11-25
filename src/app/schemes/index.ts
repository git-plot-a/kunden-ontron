import * as yup from 'yup'
import constants from './constants'

const checkContentMemoryValue = (value: unknown): boolean => {
  try {
    const size = new Blob([value as BlobPart]).size
    if (size > constants.MAX_LOADING_SIZE) {
      return false
    }
    return true
  } catch (err) {
    return false
  }
}

yup.addMethod<yup.StringSchema>(yup.string, 'maxMemoryValue', function () {
  return this.test(
    'max-memory-val',
    constants.TOO_BIG_CONTENT,
    checkContentMemoryValue,
  )
})

// const searchregexp: RegExp = new RegExp('^[a-zA-Zа-яА-Я0-9 -]+$')
const loginRegExp: RegExp = new RegExp('^[a-zA-Z0-9_\\-@.]+$')
const notOnlySymbols: RegExp = new RegExp('^.*[^\\.\\-\\s].*$')
const excludedSymbols: RegExp = new RegExp('^[^><&!"№;%:\\?\\*\\(\\)_\\+=\\-,\\.\\\\]+$')
const passwordsregexp: RegExp = new RegExp('^.*(?=.{12,})(?=.*[a-zA-Z0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()]?).*$')
// const notempty: RegExp = new RegExp(`^[^ ][a-zA-Zа-яА-Я0-9\-! ?():ÖöÄäÜüß.'"„“,]*$`)
// const url: RegExp = new RegExp('^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$')

// export const searchSchema = yup.object().shape({
//   searchval: yup.string().matches(searchregexp, constants.SEARCH_VALIDATION),
// })

// export const addArticleSchema = yup.object().shape({
//   category:
//     yup.number().positive() || 
//     yup.number().oneOf([0]).required(constants.REQUIRED_FIELD),
//   subcategorie: yup.number().positive() || yup.number().oneOf([0]),
//   title: yup
//     .string()
//     .min(3, constants.MIN_LENGTH)
//     .matches(notempty, constants.TITLE)
//     .matches(notOnlySymbols, constants.TITLE_NOT_ONLY_SYMBOLS)
//     .required(constants.REQUIRED_FIELD),
//   content: yup.string().maxMemoryValue(),
// })

export const addCategorySchema = yup.object().shape({
  name: yup.string().required(constants.REQUIRED_FIELD),
})

export const userLoginFormSchems = yup.object().shape({
  username: yup
    .string()
    .matches(loginRegExp, constants.LOGIN_INCORRECT_FORM)
    .required(constants.REQUIRED_FIELD),
  password: yup.string().required(constants.REQUIRED_FIELD),
})

// export const userRegisterFormSchems = yup.object().shape({
//   username: yup
//     .string()
//     .min(3, constants.MIN_LENGTH)
//     .max(20, constants.MAX_LENGTH)
//     .matches(notOnlySymbols, constants.TITLE_NOT_ONLY_SYMBOLS)
//     .matches(excludedSymbols, constants.UNAVALIBLE_SYMBOLS)
//     .required(constants.REQUIRED_FIELD),
//   password: yup
//     .string()
//     .matches(passwordsregexp, constants.PASSWORD)
//     .required(constants.REQUIRED_FIELD),
//   repeatpassword: yup
//     .string()
//     .oneOf([yup.ref('password'), undefined], constants.PASSWORDS_DONT_MATCH),
//   email: yup.string().email(constants.EMAIL).required(),
// })

export const userResetPasswordFormSchems = yup.object().shape({
  username: yup
    .string()
    .email(constants.EMAIL)
    .required(constants.REQUIRED_FIELD),
})

// export const feedbackFormSchems = yup.object().shape({
//   name: yup.string().required(constants.REQUIRED_FIELD),
//   email: yup.string().email(constants.EMAIL).required(constants.REQUIRED_FIELD),
//   message: yup.string(),
// })

export const resetPasswordSchems = yup.object().shape({
  oldPassword: yup
    .string()
    .matches(passwordsregexp, constants.PASSWORD)
    .required(constants.REQUIRED_FIELD),
  newPassword: yup
    .string()
    .matches(passwordsregexp, constants.PASSWORD)
    .required(constants.REQUIRED_FIELD),
  repeatNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), undefined], constants.PASSWORDS_DONT_MATCH),
})

export const editUserFromSchems = yup.object().shape({
  username: yup
    .string()
    .matches(notOnlySymbols, constants.TITLE_NOT_ONLY_SYMBOLS)
    .matches(excludedSymbols, constants.UNAVALIBLE_SYMBOLS)
    .min(3, constants.MIN_LENGTH)
    .max(20, constants.MAX_LENGTH)
    .required(constants.REQUIRED_FIELD),
  // email: yup.string().email(constants.EMAIL).required(constants.REQUIRED_FIELD),
})

export const sendRequestFormSchems = yup.object().shape({
  requestTypeId: yup.number().integer().required(constants.REQUIRED_FIELD),
  summary: yup.string().max(30, constants.MAX_LENGTH),
  description: yup.string().max(250, constants.MAX_LENGTH).required(constants.REQUIRED_FIELD),
  priority: yup.number().integer().max(4, constants.UNKNOWN_PRIORITY).min(1, constants.UNKNOWN_PRIORITY).required(constants.REQUIRED_FIELD),
  // service: yup.number().integer().required()
})

