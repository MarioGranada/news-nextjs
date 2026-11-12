-- news-nextjs schema + seed (idempotent). Run with: npm run db:migrate
create schema if not exists news;

create table if not exists news.news (
  id serial primary key,
  slug text not null unique,
  title text not null,
  content text not null,
  date date not null,
  image text not null
);

-- Not exposed through the Supabase Data API; the app queries server-side only.
alter table news.news enable row level security;

insert into news.news (slug, title, content, date, image) values
  ('will-ai-replace-humans', 'Will AI Replace Humans?', 'Since late 2022 AI is on the rise and therefore many people worry whether AI will replace humans. The answer is not that simple. AI is a tool that can be used to automate tasks, but it can also be used to augment human capabilities. The future is not set in stone, but it is clear that AI will play a big role in the future. The question is how we will use it.', '2021-07-01', 'ai-robot.jpg'),
  ('beaver-plague', 'A Plague of Beavers', 'Beavers are taking over the world. They are building dams everywhere and flooding entire cities. What can we do to stop them?', '2022-05-01', 'beaver.jpg'),
  ('couple-cooking', 'Spend more time together!', 'Cooking together is a great way to spend more time with your partner. It is fun and you get to eat something delicious afterwards. What are you waiting for? Get cooking!', '2024-03-01', 'couple-cooking.jpg'),
  ('hiking', 'Hiking is the best!', 'Hiking is a great way to get some exercise and enjoy the great outdoors. It is also a great way to clear your mind and reduce stress. So what are you waiting for? Get out there and start hiking!', '2024-01-01', 'hiking.jpg'),
  ('landscape', 'The beauty of landscape', 'Landscape photography is a great way to capture the beauty of nature. It is also a great way to get outside and enjoy the great outdoors. So what are you waiting for? Get out there and start taking some pictures!', '2022-07-01', 'landscape.jpg')
on conflict (slug) do nothing;
