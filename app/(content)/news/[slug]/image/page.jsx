import { notFound } from 'next/navigation';
import { getNewsItem } from '@/src/lib/news';

const ImagePage = async ({ params }) => {
  const { slug } = params;
  const newsItem = await getNewsItem(slug);

  if (!newsItem) {
    return notFound();
  }
  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
};

export default ImagePage;
