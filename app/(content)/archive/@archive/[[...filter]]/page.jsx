import NewsList from '@/src/components/NewsList';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/src/lib/news';
import Link from 'next/link';

const YearPage = async ({ params }) => {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  const availableYears = await getAvailableNewsYears();
  const availableMonths = selectedYear
    ? await getAvailableNewsMonths(selectedYear)
    : [];

  if (
    (selectedYear && !availableYears.includes(+selectedYear)) ||
    (selectedMonth && !availableMonths.includes(+selectedMonth))
  ) {
    throw new Error('Invalid filter.');
  }

  let news;
  let links = availableYears;

  if (selectedYear && !selectedMonth) {
    news = await getNewsForYear(selectedYear);
    links = availableMonths;
  }

  if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

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
      {newsContent}
    </>
  );
};

export default YearPage;
