import Link from 'next/link';

export const EmailCard = ({ title, slug }: { title: string; slug: string }) => {
  return (
    <>
      <div className="flex justify-between items-center w-[80vw] my-2 border border-black p-3">
        <div className=" ">{title}</div>
        <div className="">
          <Link href={`edit?slug=${slug}`}>Edit</Link>
        </div>
      </div>
    </>
  );
};
