import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNewsItem } from '@/src/lib/news';

const NewsDetailPage = async ({ params }) => {
  const { slug } = params;
  const newsItem = await getNewsItem(slug);

  if (!newsItem) {
    return notFound();
  }

  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>

        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
};

export default NewsDetailPage;
