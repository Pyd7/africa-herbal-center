import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {Navbar, Nav, NavDropdown} from "react-bootstrap"
import styles from "./Navbar.module.scss"

export default function NavBar(props) {
    const router = useRouter()
    const currentRoute = router.asPath

    return(
        <Navbar collapseOnSelect expand="lg"  variant="light" className={styles.container}>
            <Navbar.Brand href="/">
                <Image
                    src="/logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            </Navbar.Brand>
            <Navbar.Brand href="/" ><span className={styles.title}>Africa Herbal Center</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" defaultActiveKey="/" activeKey={currentRoute}>
                    <Link href="/" passHref>
                        <Nav.Link href="/" className={styles.item}><span className={styles.link} id="home">Accueil</span></Nav.Link>
                    </Link>
                    <Link href="/store" passHref>
                        <Nav.Link href="/store" className={styles.item}><span className={styles.link} id="store">Pharmacopée</span></Nav.Link>
                    </Link>
                    {/* <Link href="/blog" passHref>
                        <Nav.Link href="/blog" className={styles.item}><span className={styles.link} id="blog">Decouverte</span></Nav.Link>
                    </Link> */}
                    
                    <NavDropdown title="Decouverte" id="basic-nav-dropdown" className={styles.link}>
                        <Link href="/videos" passHref>
                            <NavDropdown.Item href="/videos" className={styles.item}><span className={styles.link} id="Videos">Videos</span></NavDropdown.Item>
                        </Link>
                        <Link href="/blog" passHref>
                            <NavDropdown.Item href="/blog" className={styles.item}><span className={styles.link} id="blog">Blog</span></NavDropdown.Item>
                        </Link>
                    </NavDropdown>
                    <Link href="/contact" passHref>
                        <Nav.Link href="/contact" className={styles.item}><span className={styles.link} id="contact">Contact</span></Nav.Link>
                    </Link>
                </Nav>

                <Nav>
                    <Nav.Link eventKey={2} href="#memes">
                        <Navbar.Brand href="#home">
                            <Image
                                src="/panier2.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                            <span className={styles.basket}>{props.totalBasket} FCFA</span>
                        </Navbar.Brand>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}