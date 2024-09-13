import Link from 'next/link'
import { Image, Card, Badge, Button} from "react-bootstrap"
import { RichText} from "prismic-reactjs"
import styles from "./ProductRow.module.scss"



export default function ProductRowSection(props) {
    const products = props.products;
    const card_items = products.map((card) =>
    <Card className={styles.cardContainer} key={card.id} >
        <Card.Img variant="top" src={card.picture} className={styles.cardImg}/>
        <Card.Body>
        <Card.Title className={styles.cardTitle}>
            {RichText.render(card.name)}
        </Card.Title>
        <Badge pill variant="info">
            {RichText.render(card.category)}
        </Badge>
        {(card.price !== null && card.price !== undefined) &&
            <Card.Text className={styles.cardContent}>
               Prix: {card.price} FCFA
            </Card.Text>
        }      
        {(card.description !== null && card.description !== undefined) &&
            <Card.Text className={styles.cardContent}>
                {RichText.render(card.description)}
            </Card.Text>
        }        
        <Link href={"/products/"+card.slug} passHref> 
            <Button variant="success" >Voir</Button>
        </Link>        
        </Card.Body>
    </Card>
    );

    return(
        <div className={styles.section}>
            <h2 className={styles.title}>Du Nouveau dans notre Boutique!</h2>
            <Link href={"/store"} passHref><h3 className={styles.action}>Visitez Notre Boutique</h3></Link>
            <div className={styles.container}>
                {card_items}
            </div>
        </div>
    )
}

