import { FC } from "react"
import styles from "./submitButton.module.scss"

type Props = {
    title: string
}

const SubmitFormButton: FC<Props> = ({title})=>{
    return <button className={styles.button} type="submit">{title}</button>
}

export { SubmitFormButton}