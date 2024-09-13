import {React, useState, useContext} from 'react';
import Link from 'next/link';
import {Badge, Image, Button, InputGroup, FormControl, Alert} from 'react-bootstrap'
import styles from './ProductDetails.module.scss'
import { RichText} from "prismic-reactjs"
//import AppContext from "../../../context/AppContext";

const ProductDetailsSection = (props) => {
    const [count, setCount] = useState(1);
    //const appContext = useContext(AppContext);
    const [showConfirmation, setshowConfirmation] = useState(false);
    const [showNoPrice, setshowNoPrice] = useState(false);
    const productB = {
        id: 0,
        name: '',
        picture: '',
        category: '',
        price: 0,
        slug: 'slug',
        description: ''
    };
    const product_data = (props.product === undefined)?productB:props.product; //props.product

    const price = (product_data.price === undefined || product_data.price === null) ? ' ---' : ' ' + product_data.price.toString() + " FCFA";
    const hasNoPrice = (product_data.price === undefined || product_data.price === null);
    //console.log(price);
    return (
        <div className={styles.contentB}>
            <div className={styles.container}>
                <Link href="/store" passHref>
                    <a>
                        <h4 className={styles.sectionCall}>&#60; Retour</h4>
                    </a>
                </Link>
                <div className= {styles.sectionTitle}>{RichText.asText(product_data.name)} </div>
                <div ><Image src={product_data.picture} fluid className={styles.cover}/></div>
               
                <Link href="#cart">
                    <h3 style={{cursor: 'pointer', textAlign: 'center'}}>
                        <Badge variant="info">{RichText.render(product_data.category)}</Badge>
                    </h3>
                </Link>
                <div className={styles.content}>
                    Prix: {price} 
                </div>
                <div className={styles.quant}>
                    <InputGroup className="mb-3" >
                        <InputGroup.Prepend>
                            <Button variant="success" /* style={{backgroundColor: '#F2CF63'}} */ onClick={() => setCount((count>1)?count - 1:1)}>-</Button>
                        </InputGroup.Prepend>
                        <FormControl aria-describedby="basic-addon1" placeholder="1" value={count} onChange = {() => {}}/>
                        <InputGroup.Append>
                            <Button variant="success" /* style={{backgroundColor: '#F2CF63'}} */ onClick={() => setCount(count + 1)}>+</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <div className={styles.contentDesc}>
                    {/* <h4 style={{textAlign: 'center'}}>Description:</h4> */}
                    {/* <RichText render={product_data.description} className={styles.desc}/> */}
                    {RichText.asText(product_data.description)}
                </div>
                <Link href="#cart">
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant="success" style={{marginBottom: '20px'}} 
                        onClick={() => {   
                                /* const cartItem = Object.assign(product_data, {'sentQuantity': count});
                                const isAdded = appContext.addItem(cartItem);
                                if (!isAdded && hasNoPrice) {setshowNoPrice(true)} */
                                setshowConfirmation(true/*isAdded*/);
                            }
                        }
                        >
                            + Ajouter Au Panier
                        </Button>
                    </div>
                </Link>
                {showConfirmation && 
                    <Alert variant="success" onClose={() => setshowConfirmation(false)} dismissible autoFocus style={{marginTop: '10px', textAlign: 'center'}}>
                        <Alert.Heading>Ce produit a bien ete ajoute a votre commande</Alert.Heading>
                        <Link href="/store">
                            <p style={{cursor: 'pointer', textDecoration: 'underline'}}>Voir la commande &#62;</p>
                        </Link>
                    </Alert>
                }
                {showNoPrice && 
                    <Alert variant="success" onClose={() => setshowNoPrice(false)} dismissible autoFocus style={{marginTop: '10px', textAlign: 'center'}}>
                        <Alert.Heading>Ce Produit n&apos;a pas de prix listé.</Alert.Heading>
                        <Link href="/contact">
                            <p style={{cursor: 'pointer', textDecoration: 'underline'}}>Contactez Nous pour plus the details &#62;</p>
                        </Link>
                    </Alert>
                }
            </div>
        </div>
    )
}

export default ProductDetailsSection