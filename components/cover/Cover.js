import Link from 'next/link'
//import Image from 'next/image'
import {Carousel, Image} from "react-bootstrap"
import styles from "./Cover.module.scss"


export default function CoverSection(props) {
    const imageData = props.imageData;
    return(
        <div className={styles.cover}>
            <Image 
                className={styles.image}
                src={imageData.url}
            >

            </Image>
        </div>
    )
}