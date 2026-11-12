import { notFound } from 'next/navigation';
import ModalBackdrop from '@/src/components/ModalBackdrop';
import { getNewsItem } from '@/src/lib/news';

const ImageInterceptedPage = async ({ params }) => {
  const { slug } = params;
  const newsItem = await getNewsItem(slug);

  if (!newsItem) {
    return notFound();
  }
  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
};

export default ImageInterceptedPage;
