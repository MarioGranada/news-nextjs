import NewsList from '@/src/components/NewsList';
import { getNewsForYear } from '@/src/utils/newsUtils';

const YearPage = ({ params }) => {
  const { year } = params;
  const news = getNewsForYear(year);

  return <NewsList news={news} />;
};

export default YearPage;
