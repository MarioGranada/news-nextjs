import sql from './db';

const columns = sql`id, slug, title, content, to_char(date, 'YYYY-MM-DD') as date, image`;

export async function getAllNews() {
  return sql`select ${columns} from news.news order by date desc`;
}

export async function getNewsItem(slug) {
  const [item] = await sql`select ${columns} from news.news where slug = ${slug}`;
  return item;
}

export async function getLatestNews() {
  return sql`select ${columns} from news.news order by date desc limit 3`;
}

export async function getAvailableNewsYears() {
  const rows = await sql`
    select distinct extract(year from date)::int as year
    from news.news
    order by year desc
  `;
  return rows.map((row) => row.year);
}

export async function getAvailableNewsMonths(year) {
  const rows = await sql`
    select distinct extract(month from date)::int as month
    from news.news
    where extract(year from date) = ${+year}
    order by month desc
  `;
  return rows.map((row) => row.month);
}

export async function getNewsForYear(year) {
  return sql`
    select ${columns} from news.news
    where extract(year from date) = ${+year}
    order by date desc
  `;
}

export async function getNewsForYearAndMonth(year, month) {
  return sql`
    select ${columns} from news.news
    where extract(year from date) = ${+year}
      and extract(month from date) = ${+month}
    order by date desc
  `;
}
