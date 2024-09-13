import Link from 'next/link'
import { Image, Card, Badge, Button} from "react-bootstrap"
import { RichText} from "prismic-reactjs"
import styles from "./VideosRow.module.scss"
import Moment from "react-moment";
import 'moment/locale/fr';
import ReactPlayer from 'react-player'

Moment.globalLocale = 'fr';


export default function VideoRowSection(props) {
    const videos = props.videos;
    const card_items = videos.map((card) =>
    <Card className={styles.cardContainer} key={card.id} >
        {/* <Card.Img variant="top" src={card.picture} className={styles.cardImg}/> */}
            <ReactPlayer
                className={styles.cardImg}                  
                url= {card.url}
                width = '100%'
                height = '300px'
                controls 
            /> 
            <Card.Body>
            <Card.Title className={styles.cardTitle}>
                { card.title /*RichText.render(card.title)*/}
            </Card.Title>
            {(card.date !== null && card.date !== undefined) &&
                <Card.Text className={styles.cardContent}>
                
                <Moment fromNow locale='fr'>
                    {card.date}
                </Moment>
                </Card.Text>
            }     
            <a href={card.url /*"/products/"+card.id*/} target="_blank" rel="noreferrer"> 
                <Button variant="success" >Voir</Button>
            </a>        
        </Card.Body>
    </Card>
    );

    return(
        <div className={styles.section}>
            <h2 className={styles.title}>Nos dernieres Videos</h2>
            <Link href={"/videos"} passHref><h3 className={styles.action}>Voir toutes nos videos</h3></Link>
            <div className={styles.container}>
                {card_items}
            </div>
        </div>
    )
}

