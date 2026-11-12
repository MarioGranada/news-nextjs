import NewsList from '@/src/components/NewsList';
import { getLatestNews } from '@/src/lib/news';

const DefaultLatestPage = async () => {
  const latestNews = await getLatestNews();
  return (
    <>
      <h1>Latest News</h1>
      <NewsList news={latestNews} />
    </>
  );
};

export default DefaultLatestPage;
