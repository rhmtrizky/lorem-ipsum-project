import { cn } from '@/lib/utils';
import Marquee from '@/components/magicui/marquee';
import reviewService from '@/services/review';
import { useEffect, useState } from 'react';
import { Avatar } from '@nextui-org/react';

const ReviewCard = ({ image, name, review, description }) => {
  return (
    <figure className={cn('relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4', 'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]', 'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]')}>
      <div className="flex flex-row items-start gap-2">
        <Avatar
          src={image}
          alt="profile image"
          className="border-[1px] border-slate-500"
        />
        <div className="flex flex-col text-slate-600">
          <figcaption className="text-sm font-bold">{name}</figcaption>
          <p className="text-xs">-{review?.charAt(0).toUpperCase() + review.slice(1)}</p>
          <blockquote className="mt-2 text-sm text-slate-600 font-semibold">{description}</blockquote>
        </div>
      </div>
    </figure>
  );
};

export default function HomeFeedback() {
  const [reviews, setReviews] = useState([]);
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  const getReviews = async () => {
    try {
      const { data } = await reviewService.getReviews();
      setReviews(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);
  return (
    <div className="w-full flex flex-col px-4 gap-5">
      <div className="text-center">
        <h2 className="text-[40px] font-archivoBlack font-extrabold text-primary">What People Are Saying</h2>
        <p className="text-slate-500">
          Dont just take our word for it. Here what real <br />
          <b>people</b> are saying about Harapan Bunda Hospital
        </p>
      </div>
      <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden border bg-background">
        <Marquee
          pauseOnHover
          className="[--duration:20s]"
        >
          {firstRow.map((review) => (
            <ReviewCard
              key={review.username}
              {...review}
            />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className="[--duration:20s]"
        >
          {secondRow.map((review) => (
            <ReviewCard
              key={review.username}
              {...review}
            />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </div>
  );
}
