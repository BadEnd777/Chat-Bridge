import Link from 'next/link';

export const HorizonFuntions = ({ list }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {list.map((item) => (
        <Link href={`#${item.toLowerCase().replace(/ /g, '-')}`} key={item}>
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800 p-2 mt-4 shadow-md">
            <p className="text-neutral-900 dark:text-neutral-100 font-medium text-center">
              {item}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};