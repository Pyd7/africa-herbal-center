import Link from 'next/link'
import {useState} from 'react'
import { Image, Card, Badge, Button, Pagination} from "react-bootstrap"
import { RichText} from "prismic-reactjs"
import styles from "./ProductRow.module.scss"

const test = [
    {
        id: 1,
        name: "Revitalose Tonic",
        picture: "/products/p1.jpg",
        category: "brevage",
        price: "5000",
        description: "Manque d'appetit, Infections Severes, Regles douloureuses, vertiges",
    },
    {
        id: 2,
        name: "Tetra-Bio Forte",
        picture: "products/p2.jpg",
        category: "Gelules",
        price: "4500",
        description: "Hemorroides, Muges, Maux de ventre, infections vaginales, faiblesse sexuelle",
    },    
    {
        id: 3,
        name: "Pommade MALEPKO",
        picture: "products/p3.jpg",
        category: "Pommade",
        price: "3500",
        description: "Entorses, Maux de hanches, Genoux, Pieds d'athletes, Rhumatismes, la fievre",
    },
    {
        id: 4,
        name: "Revitalose Tonic2",
        picture: "/products/p1.jpg",
        category: "brevage",
        price: "5000",
        description: "Manque d'appetit, Infections Severes, Regles douloureuses, vertiges",
    },
    {
        id: 5,
        name: "Tetra-Bio Forte2",
        picture: "products/p2.jpg",
        category: "Gelules",
        price: "4500",
        description: "Hemorroides, Muges, Maux de ventre, infections vaginales, faiblesse sexuelle",
    },    
    {
        id: 6,
        name: "Pommade MALEPKO2",
        picture: "products/p3.jpg",
        category: "Pommade",
        price: "3500",
        description: "Entorses, Maux de hanches, Genoux, Pieds d'athletes, Rhumatismes, la fievre",
    },
    {
        id: 7,
        name: "Revitalose Tonic3",
        picture: "/products/p1.jpg",
        category: "brevage",
        price: "5000",
        description: "Manque d'appetit, Infections Severes, Regles douloureuses, vertiges",
    },
    {
        id: 8,
        name: "Tetra-Bio Forte3",
        picture: "products/p2.jpg",
        category: "Gelules",
        price: "4500",
        description: "Hemorroides, Muges, Maux de ventre, infections vaginales, faiblesse sexuelle",
    },    
    {
        id: 9,
        name: "Pommade MALEPKO3",
        picture: "products/p3.jpg",
        category: "Pommade",
        price: "3500",
        description: "Entorses, Maux de hanches, Genoux, Pieds d'athletes, Rhumatismes, la fievre",
    }

];

export default function ProductRowSection(props) {
    const products = props.products;
    const pageLimit = 6;
    let items = [];
    const numberOfPages = Math.ceil(products.length/pageLimit)

    var slices = [];
    for (let i = 0; i < numberOfPages; i++) {
        var temp = products;
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
                                 href="#store-New-Page" //href= {"#"+ number.toString()}
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
                href="#store-New-Page" //href={"#"+ activePage.toString()}
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
                href="#store-New-Page" //href={"#"+ activePage.toString()}
              />
          </Pagination>
        </div>
      );
    
    //const dataToShow = slices[activePage-1]
    const card_items = dataToShow.map((card) =>
    <Card className={styles.cardContainer} key={card.id} >
        <Card.Img variant="top" src={card.picture} className={styles.cardImg}/>
        <Card.Body>
        <Card.Title className={styles.cardTitle}>
            {RichText.render(card.name)}
        </Card.Title>
        <Badge pill variant="info" style={{fontSize: 22}}>
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
            <h2 className={styles.title} id="store-New-Page">Pharmacopée</h2>
            <Link href={"/store"} passHref><h3 className={styles.action} >Nos Produits</h3></Link>
            <div className={styles.container}>
                {card_items}
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