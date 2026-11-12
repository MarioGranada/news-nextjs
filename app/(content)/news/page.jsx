import NewsList from '@/src/components/NewsList';
import { getAllNews } from '@/src/lib/news';

const NewsPage = async () => {
  const news = await getAllNews();

  return (
    <div>
      <h1>News Page</h1>
      <NewsList news={news} />
    </div>
  );
};

export default NewsPage;
