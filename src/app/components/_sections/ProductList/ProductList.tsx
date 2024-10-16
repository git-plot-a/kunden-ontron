import MiniTile from "../../_buttons/MiniTile/MiniTile"
import constants from "./constants"
import styles from "./productList.module.scss"

const ProductList = () => {

    const SERVICE_LIST = [
        { title: 'Atlassian Jira', icon: '/img/Icon.png', updateData: 'Last updated: 27.08.2024', serviceLevels: [{ type: "Plattform", value: "Silver" }, { type: "Inhalt", value: "Bronze" }], status: { title: 'On air', denger_level: 0 } },
        { title: 'Atlassian Jira', icon: '/img/Icon.png', updateData: 'Last updated: 27.08.2024', serviceLevels: [{ type: "Plattform", value: "Silver" }, { type: "Inhalt", value: "Bronze" }], status: { title: 'On air', denger_level: 0 } },
        { title: 'Atlassian Jira', icon: '/img/Icon.png', updateData: 'Last updated: 27.08.2024', serviceLevels: [{ type: "Plattform", value: "Silver" }, { type: "Inhalt", value: "Bronze" }], status: { title: 'On air', denger_level: 0 } },
        { title: 'Atlassian Jira', icon: '/img/Icon.png', updateData: 'Last updated: 27.08.2024', serviceLevels: [{ type: "Plattform", value: "Silver" }, { type: "Inhalt", value: "Bronze" }], status: { title: 'On air', denger_level: 0 } },
        { title: 'Atlassian Jira', icon: '/img/Icon.png', updateData: 'Last updated: 27.08.2024', serviceLevels: [{ type: "Plattform", value: "Silver" }, { type: "Inhalt", value: "Bronze" }], status: { title: 'On air', denger_level: 0 } },
        { title: 'Atlassian Jira', icon: '/img/Icon.png', updateData: 'Last updated: 27.08.2024', serviceLevels: [{ type: "Plattform", value: "Silver" }, { type: "Inhalt", value: "Bronze" }], status: { title: 'On air', denger_level: 0 } }

    ]

    return <div className={styles.container}>
        <h3 className={styles.title}>
            {constants.TITLE}
        </h3>
        <div className={styles.serviceList}>
            {SERVICE_LIST.length > 0 && SERVICE_LIST.map((item, key) => (<div key={key} className={styles.serviceItem}><MiniTile service={item} /></div>))}
        </div>
    </div>
}

export default ProductList