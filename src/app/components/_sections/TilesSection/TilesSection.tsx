import Tile from "../../_buttons/Tile/Tile"
import constants from "./constants"
import styles from "./tileSection.module.scss"

const TilesSection = () => {
    return <div className={styles.container}>
        {constants.TILES_LIST.map((item, key) => (
            <div key={key} className={styles.itemContainer}>
                <Tile title={item.title} icon={item.icon} classes={`${styles[`tile-${key+1}`]} animation-fade-in-bottom tile-${key+1}`}/>
            </div>
        ))}
    </div>
}

export default TilesSection