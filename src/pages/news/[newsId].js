import RootLayout from '@/components/Layouts/RootLayout';
import { useRouter } from 'next/router';
import React from 'react';

const NewsDetailPage = ({ news }) => {
    const router = useRouter()
    return (
        <div>
            <h1>title: {news.title} </h1>
            <p>id: {news.id}</p>
        </div>
    );
};

export default NewsDetailPage;

NewsDetailPage.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
    const res = await fetch(`http://localhost:5000/news`)
    const news = await res.json()

    const paths = news.map((item) => ({
        params: { newsId: item.id }
    }))

    return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
    const { params } = context
    const res = await fetch(`http://localhost:5000/news/${params.newsId}`)
    const data = await res.json()

    return {
        props: {
            news: data
        }
    }
}