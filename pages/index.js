import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Prismic from "prismic-javascript";
import { Client } from "../prismic-configuration.js";

import HeroSection from '../components/home/heroSection/Hero.js'
import PresentationSection from '../components/home/presentation/Presentation.js'
import ProductRowSection from '../components/home/products/ProductRow.js'
import ArticleRowSection from '../components/home/blog/ArticlesRow.js'
import VideoRowSection from '../components/home/video/VideosRow.js'
import ContactSection from '../components/home/contact/Contact.js'

export default function Home({slides, presentation, products, articles, videos}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Africa Herbal Center - Accueil</title>
        <meta name="description" content="La Nature prend soin de vous." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HeroSection slides={slides} />
        <PresentationSection information={presentation} />
        <ProductRowSection products={products} />
        <ArticleRowSection articles={articles} />
        <VideoRowSection videos={videos} />
        <ContactSection />
        
      </main>

      
    </div>
  )
}

export async function getStaticProps() {
  const slides0 = await Client().query(
    Prismic.Predicates.at("document.type", "slides")
  );
  const presentation0 =  await Client().query(
    Prismic.Predicates.at("document.type", "presentation")
  );
  const products0 = await Client().query(
    Prismic.Predicates.at("document.type", "product")
  );
  const articles0 = await Client().query(
    Prismic.Predicates.at("document.type", "article")
  );
  const videos0 = await Client().query(
    Prismic.Predicates.at("document.type", "video"),
    { orderings : '[my.video.date desc]' }
  );

  const slides = slides0.results.map(slide => {
    const container = {};
    container['id'] = slide.id;
    container['title'] = slide.data.title[0].text;
    container['caption'] = slide.data.caption[0].text;
    container['picture'] = slide.data.picture.url;
    return container;
  })

  const presentation = presentation0.results.map(info => {
    const container = {};
    container['id'] = info.id;
    container['text'] = info.data.info;
    container['picture'] = info.data.picture.url;
    return container;
  })[0] 

  const products = products0.results.slice(0, 3).map(info => {
    const container = {};
    container['id'] = info.id;
    container['name'] = info.data.name;
    container['picture'] = info.data.picture.url;
    container['category'] = info.data.category;
    container['price'] = info.data.price;
    container['slug'] = info.slugs[0];
    container['description'] = info.data.description;
    return container;
  }) 

  const articles = articles0.results.slice(0, 3).map(info => {
    const container = {};
    container['id'] = info.id;
    container['title'] = info.data.title;
    container['picture'] = info.data.picture.url;
    container['category'] = info.data.category;
    container['date'] = info.last_publication_date;
    container['slug'] = info.slugs[0];
    container['content'] = info.data.content;
    return container;
  })

  const videos = videos0.results.slice(0, 3).map(video => {
    const container = {};
    container['id'] = video.id;
    container['title'] = video.data.title;
    container['url'] = video.data.url.url;
    container['date'] = video.data.date;

    return container;
  })

  //console.log(videos);
  
  return {
    props: {
      slides,
      presentation,
      products,
      articles,
      videos,
    },
    revalidate: 10, // In seconds
  }
}
