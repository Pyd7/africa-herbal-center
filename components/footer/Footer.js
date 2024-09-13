import {Navbar, Nav} from "react-bootstrap"
import Image from 'next/image'
import styles from "./Footer.module.scss"

export default function FooterBar() {
    return(
        <Navbar collapseOnSelect expand="lg" variant="light" className={styles.container}>
            <Navbar.Brand href="#home" className="ml-auto mr-2">
                <Image
                    src="/logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            </Navbar.Brand>
            <Navbar.Brand className={styles.footerText}>Africa Herbal Center Copyright &#169; {(new Date()).getFullYear()} <br/> <span className={styles.author}>Powered By 
            <a href = "mailto: ignitouch@gmail.com" style={{fontWeight: "bold", color: 'darkgreen', textDecoration: 'none'}}> IgniTouch </a>
            </span></Navbar.Brand>
        </Navbar>
    )
}