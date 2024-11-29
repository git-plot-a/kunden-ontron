import { useRouter } from "next/navigation"
import Tile from "../../_buttons/Tile/Tile"
import Container from "../../_layout/Container/Container"
import Row from "../../_layout/Row/Row"
import Col from "../../_layout/Col/Col"
import constants from "./constants"
import styles from "./tileSection.module.scss"


const TilesSection = () => {
    const router = useRouter()

    const tiles = constants.TILES_LIST
    tiles[0].callback = () => {
        router.push('/support')
    }
    tiles[1].callback = () => {
        router.push('/task-tracking')
    }
    tiles[2].callback = () => {
        router.push('/platforms')
    }
    tiles[3].callback = () => {
        router.push('/downloads')
    }
    tiles[4].callback = () => {
        router.push('/reports')
    }

    return <div className={styles.container}>
        <Container>
            <Row>
                {constants.TILES_LIST.map((item, key) => (
                    <Col span={key < 3 ? 12 : 6}>
                        <div key={key} className={styles.itemContainer}>
                            <Tile title={item.title} icon={item.icon} classes={`${styles[`tile-${key + 1}`]} animation-fade-in-bottom tile-${key + 1}`} callback={item.callback} />
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
}

export default TilesSection