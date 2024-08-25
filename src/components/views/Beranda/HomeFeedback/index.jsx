import { cn } from '@/lib/utils';
import Marquee from '@/components/magicui/marquee';
import Image from 'next/image';

const reviews = [
  {
    name: 'Jack',
    username: '@jack',
    body: "I've never seen anything like this before. It's amazing. I love it.",
  },
  {
    name: 'Jill',
    username: '@jill',
    body: "I don't know what to say. I'm speechless. This is amazing.",
  },
  {
    name: 'John',
    username: '@john',
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: 'Jane',
    username: '@jane',
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: 'Jenny',
    username: '@jenny',
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: 'James',
    username: '@james',
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure className={cn('relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4', 'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]', 'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]')}>
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function HomeFeedback() {
  return (
    <div>
      <div className="text-center" >
        <h2 className="text-[40px] font-archivoBlack font-extrabold text-primary" >What People Are Saying</h2>
        <p className='text-slate-500' >Dont just take our word for it. Here what real <br/><b>people</b> are saying about Harapan Bunda Hospital</p>
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
