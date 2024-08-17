import NewsList from '@/src/components/NewsList';
import { getLatestNews } from '@/src/utils/newsUtils';

const DefaultLatestPage = () => {
  const latestNews = getLatestNews();
  return (
    <>
      <h1>Latest News</h1>
      <NewsList news={latestNews} />
    </>
  );
};

export default DefaultLatestPage;
