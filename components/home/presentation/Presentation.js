import Link from 'next/link'
//import Image from 'next/image'
import { Image} from "react-bootstrap"
import { RichText} from "prismic-reactjs"
import styles from "./Presentation.module.scss"


export default function PresentationSection(props) {
    const info = props.information;
    
    return(
        <div className={styles.section}>
            <h2 className={styles.title}>Qui Sommes Nous?</h2>
            <div className={styles.container}>
                <div className={styles.PresentationPicture}>
                <Image
                    src= {info.picture}
                    alt="First slide"
                    height='100%'
                    width='auto'
                />
                </div>
                <div className={styles.PresentationText}>
                    <div 
                    className={styles.InfoText}>
                        {RichText.asText(info.text)}
                        {/*info.text*/}
                        {/* Africa Herbal center est un centre de sante specialise dans les traitements traditionels a
                        base de plantes. 
                        Africa Herbal center est un centre de sante specialise dans les traitements traditionels a
                        base de plantes. 
                        Africa Herbal center est un centre de sante specialise dans les traitements traditionels a
                        base de plantes. */}
                    </div>
                </div>
            </div>
        </div>
    )
}