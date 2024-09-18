import clsx from "clsx"
import { FC } from "react"
import styles from "./submitButton.module.scss"

type Props = {
    title: string,
    classes?: string
}

const SubmitFormButton: FC<Props> = ({title, classes})=>{
    return <button className={clsx(styles.button, classes)} type="submit">{title}</button>
}

export { SubmitFormButton}