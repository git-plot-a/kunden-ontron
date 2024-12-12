import React from "react"
import MiniTile from "../../_buttons/MiniTile/MiniTile"
import clsx from "clsx"
import constants from "./constants"
import styles from "./productList.module.scss"

type Props = {
    services: Array<Service>
}

const ProductList: React.FC<Props> = ({services}) => {

    return <div className={styles.container}>
        <h3 className={clsx(styles.title, "animation-fade-in animation-fade-in-top middle-duration")}>
            {constants.TITLE}
        </h3>
        <div className={styles.serviceList}>
            {services.length > 0 && services.map((item, key) => (<div key={key} className={styles.serviceItem}><MiniTile service={item} currentStyle={{transitionDelay: `${key*0.2}s`}}/></div>))}
        </div>
    </div>
}

export default ProductList