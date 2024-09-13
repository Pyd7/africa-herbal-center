import Link from 'next/link'
//import Image from 'next/image'
import {Carousel, Image} from "react-bootstrap"
import styles from "./Hero.module.scss"

// const slides = [
//     {
//         id: 1,
//         picture: "/cover/cover1.jpg",
//         title: "Test Test Test Test Test Test Test Test Test TestTestTestTestTestTestTestTest",
//         caption: "Test Test Test Test Test Test Test Test Test TestTestTestTestTestTestTestTest Test Test Test Test Test Test Test Test Test TestTestTestTestTestTestTestTest Test Test Test Test Test Test Test Test Test TestTestTestTestTestTestTestTest Test Test Test Test Test Test Test Test Test TestTestTestTestTestTestTestTest Test Test Test Test Test Test Test Test Test TestTestTestTestTestTestTestTest Test Test Test Test Test Test Test Test Test TestTestTestTestTestTestTestTest",
//     },
// ]

export default function HeroSection(props) {
    const slides = props.slides;
    const carousel_items = slides.map((slide) =>
        <Carousel.Item className={styles.cItem} key={slide.id}>
            <div className={styles.innerItem}>
                <Image
                className={styles.carouselImage}
                src={slide.picture}
                alt="First slide"
                fluid
                />
                {(slide.title != "none" || slide.caption != "none") && <Carousel.Caption className={styles.carouselCaption}>
                <h3 className={styles.captionTitle}>{slide.title}</h3>
                <p className={styles.captionText}>{slide.caption}</p>
                </Carousel.Caption>}
            </div>
        </Carousel.Item >
    );
    return(
        <div className={styles.carousel}>
            <Carousel>
                {carousel_items}
                {/* <Carousel.Item className={styles.cItem}>
                    <div className={styles.innerItem}>
                        <Image
                        className={styles.carouselImage}
                        src="/cover/banner1.jpg"
                        alt="First slide"
                        fluid
                        />
                        <Carousel.Caption className={styles.carouselCaption}>
                        <h3 className={styles.captionTitle}>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item >                
                <Carousel.Item className={styles.cItem}>
                    <div className={styles.innerItem}>
                        <Image
                        className={styles.carouselImage}
                        src="/cover/banner2.jpg"
                        alt="First slide"
                        fluid
                        />
                        <Carousel.Caption className={styles.carouselCaption}>
                        <h3 className={styles.captionTitle}>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item > */}
            </Carousel>
        </div>
    )
}