import Link from 'next/link'
import {useState} from 'react'
import { Pagination, Card, Badge, Button} from "react-bootstrap"
import { RichText} from "prismic-reactjs"
import styles from "./ArticlesRow.module.scss"
import Moment from "react-moment";
import 'moment/locale/fr';

Moment.globalLocale = 'fr';

export default function ArticleRowSection(props) {
    const articles = props.articles;
    const pageLimit = 6;
    let items = [];
    const numberOfPages = Math.ceil(articles.length/pageLimit)

    var slices = [];
    for (let i = 0; i < numberOfPages; i++) {
        var temp = articles;
        slices.push(temp.slice(pageLimit*i, pageLimit*i + pageLimit))
    }

    const [dataToShow, setDataToShow] = useState(slices[0]);
    const [activePage, setActivePage] = useState(1);

    for (let number = 1; number <= numberOfPages; number++) {
        items.push(
            <Pagination.Item key={number} data-key={number} 
                             active={number === activePage} 
                             className={styles.paginationItem} 
                             onClick={(e) => {
                                 //alert(e.target.getAttribute('data-key'));
                                 var newActive = parseInt(e.target.getAttribute('data-key'));
                                 setActivePage(newActive); 
                                 setDataToShow(slices[newActive-1]); 
                             }}
                             href={"#articles-"+ number.toString()}
            >
                {number}
            </Pagination.Item>,
        );
    }
    const pagination = (
        <div className={styles.pagination} >
          <Pagination >
              <Pagination.Prev 
                onClick={(e) => {
                    if (activePage == 1){
                        return;
                    }
                    var newActive = activePage -1;
                    setActivePage(newActive); 
                    setDataToShow(slices[newActive-1]); 
                    //alert(activePage)
                }}
                href={"#articles-"+ activePage.toString()}
              />
              {items}
              <Pagination.Next 
                onClick={(e) => {
                    if (activePage == numberOfPages){
                        return;
                    }
                    var newActive = activePage+1;
                    setActivePage(newActive); 
                    setDataToShow(slices[newActive-1]); 
                    //alert(activePage)
                }}
                href={"#articles-"+ activePage.toString()}
              />
          </Pagination>
        </div>
      );


    const card_items = dataToShow.map((card) =>
    <Card className={styles.cardContainer} key={card.id} >
        <Card.Img variant="top" src={card.picture} className={styles.cardImg}/>
        <Card.Body>
        <Card.Title className={styles.cardTitle}>
            {RichText.render(card.title)}
        </Card.Title>
        <Badge pill variant="info">
            {RichText.render(card.category)}
        </Badge>
        {(card.date !== null && card.date !== undefined) &&
            <Card.Text className={styles.cardContent}>
               
               <Moment fromNow locale='fr'>
                {card.date}
              </Moment>
            </Card.Text>
        }      
        {(card.content !== null && card.content !== undefined) &&
            <Card.Text className={styles.cardContent}>
                {RichText.render(card.content)}
            </Card.Text>
        }        
        <Link href={"/blog" /*"/products/"+card.id*/} passHref> 
            <Button variant="success" >Lire</Button>
        </Link>        
        </Card.Body>
    </Card>
    );

    return(
        <div className={styles.section}>
            <h2 className={styles.title}>A la Decouverte du Monde des Plantes</h2>
            <Link href={"/blog"} passHref><h3 className={styles.action}>Nos Articles</h3></Link>
            <div className={styles.Mcontainer}>
                <div className={styles.container}>{card_items}</div>
            </div>
            {pagination}
        </div>
    )
}

// const test = [
//     {
//         id: 1,
//         name: "Revitalose Tonic",
//         picture: "/products/p1.jpg",
//         category: "brevage",
//         price: "5000",
//         description: "Manque d'appetit, Infections Severes, Regles douloureuses, vertiges",
//     },
//     {
//         id: 2,
//         name: "Tetra-Bio Forte",
//         picture: "products/p2.jpg",
//         category: "Gelules",
//         price: "4500",
//         description: "Hemorroides, Muges, Maux de ventre, infections vaginales, faiblesse sexuelle",
//     },    
//     {
//         id: 3,
//         name: "Pommade MALEPKO",
//         picture: "products/p3.jpg",
//         category: "Pommade",
//         price: "3500",
//         description: "Entorses, Maux de hanches, Genoux, Pieds d'athletes, Rhumatismes, la fievre",
//     }

// ];