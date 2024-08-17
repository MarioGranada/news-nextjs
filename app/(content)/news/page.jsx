import { DUMMY_NEWS } from '@/dummy-news';
import NewsList from '@/src/components/NewsList';

const NewsPage = async () => {
  return (
    <div>
      <h1>News Page</h1>
      <NewsList news={DUMMY_NEWS} />
    </div>
  );
};

export default NewsPage;
