import Link from 'next/link'
import {useState} from 'react'
import { Image, Card, Pagination, Button} from "react-bootstrap"
import { RichText} from "prismic-reactjs"
import styles from "./VideosRow.module.scss"
import Moment from "react-moment";
import 'moment/locale/fr';
import ReactPlayer from 'react-player'

Moment.globalLocale = 'fr';


export default function VideoRowSection(props) {
    const videos = props.videos;
    const pageLimit = 6;
    let items = [];
    const numberOfPages = Math.ceil(videos.length/pageLimit)

    var slices = [];
    for (let i = 0; i < numberOfPages; i++) {
        var temp = videos;
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
                             href={"#videos-"+ number.toString()}
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
                href={"#videos-"+ activePage.toString()}
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
                href={"#videos-"+ activePage.toString()}
              />
          </Pagination>
        </div>
      );

    const card_items = dataToShow.map((card) =>
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
            <h2 className={styles.title}>Notre Mediatheque rien que pour vous</h2>
            <Link href={"/videos"} passHref><h3 className={styles.action}>Nos videos</h3></Link>
            <div className={styles.container}>
                {card_items}
            </div>
            {pagination}
        </div>
    )
}

