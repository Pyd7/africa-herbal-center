import styles from './layout.module.scss';
import NavBar from '../components/navbar/Navbar.js';
import FooterBar from '../components/footer/Footer.js';
import { Analytics } from '@vercel/analytics/react';

export default function Layout ({children}){
    return (
        <div className={styles.Layout}>
            <div className={styles.navbar}>
                <NavBar totalBasket="0"/>
            </div>
            <div>
                {children}
                <Analytics />
            </div>
            <div className={styles.footer}>
                <FooterBar />
            </div>
        </div>
    )
}