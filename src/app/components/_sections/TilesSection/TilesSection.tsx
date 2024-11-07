import { useRouter } from "next/navigation"
import Tile from "../../_buttons/Tile/Tile"
import constants from "./constants"
import styles from "./tileSection.module.scss"

const TilesSection = () => {
    const router = useRouter()

    const tiles = constants.TILES_LIST
    tiles[0].callback = () =>{
        router.push('/support')
    }
    tiles[1].callback = () =>{
        router.push('/task-tracking')
    }
    tiles[2].callback = () =>{
        router.push('/platforms')
    }
    tiles[3].callback = () =>{
        router.push('/downloads')
    }

    return <div className={styles.container}>
        {constants.TILES_LIST.map((item, key) => (
            <div key={key} className={styles.itemContainer}>
                <Tile title={item.title} icon={item.icon} classes={`${styles[`tile-${key+1}`]} animation-fade-in-bottom tile-${key+1}`} callback={item.callback}/>
            </div>
        ))}
    </div>
}

export default TilesSection