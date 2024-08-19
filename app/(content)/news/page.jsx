// import { DUMMY_NEWS } from '@/dummy-news';
import NewsList from '@/src/components/NewsList';

const NewsPage = async () => {
  const response = await fetch('http://localhost:8080/news');

  if (!response.ok) {
    throw new Error('Could not fetch data');
  }

  const news = await response.json();

  return (
    <div>
      <h1>News Page</h1>
      {/* <NewsList news={DUMMY_NEWS} /> */}
      <NewsList news={news} />
    </div>
  );
};

export default NewsPage;
