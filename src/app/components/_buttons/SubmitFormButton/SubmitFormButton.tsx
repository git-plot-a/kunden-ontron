import clsx from "clsx"
import { FC } from "react"
import styles from "./submitButton.module.scss"

type Props = {
    title: string,
    classes?: string,
    blocked: boolean
}

const SubmitFormButton: FC<Props> = ({title, classes, blocked=false})=>{
    return <button className={clsx(styles.button, classes, blocked ? styles.blocked : '')} type="submit" disabled={blocked}>{title}</button>
}

export { SubmitFormButton}