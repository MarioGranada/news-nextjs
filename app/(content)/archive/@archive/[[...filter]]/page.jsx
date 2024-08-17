import NewsList from '@/src/components/NewsList';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/src/utils/newsUtils';
import Link from 'next/link';

const YearPage = ({ params }) => {
  const filter = params.filter;
  console.log('in here oe params', { params });
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  // const news = getNewsForYear(year);

  let news;
  let links = getAvailableNewsYears();

  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  if (
    (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
    (selectedMonth &&
      !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))
  ) {
    throw new Error('Invalit filter.');
  }

  // const links = getAvailableNewsYears();

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;

              return (
                <li key={link}>
                  <Link href={href}>{link} </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {/* <NewsList news={news} /> */}
      {newsContent}
    </>
  );
};

export default YearPage;
