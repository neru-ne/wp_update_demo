import Link from 'next/link';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { twMerge } from 'tailwind-merge';

import { range } from '@/hooks/utils';

export const PageNavi = (props: {
  nowPage: number,
  allPosts: number,
}) => {
  const { nowPage, allPosts } = props;
  const PER_PAGE = Number(process.env.NEXT_PUBLIC_PER_PAGE);//1ページにつき、いくつ記事を入れるか
  const STEP = 2; //現在のページの前後の表示数
  const totalCount = allPosts;//全記事数
  const offset = Number(nowPage);//現在のページ数

  let maxPage = Math.ceil(totalCount / PER_PAGE); //全ページ数
  let firstPage = (offset) - STEP; // 表示する最初のページ
  let lastPage = (offset) + STEP;//表示する最後のページ

  let firstFlg = false;//・・・と最初のリンクを表示するかどうか
  let lastFlg = false;//・・・と最後のリンクを表示するかどうか

  if (firstPage <= 0) {
    firstPage = 1
    firstFlg = false;
  } else {
    if (1 < firstPage) {
      firstFlg = true;
    } else {
      firstFlg = false;
    }
  };
  if (maxPage < firstPage) {
    return;
  }

  if (maxPage <= lastPage) {
    lastPage = maxPage
    lastFlg = false;
  } else {
    lastFlg = true
  };
  console.log(offset)
  return (
    <>
      <div className='flex justify-center'>
        <ul className='flex gap-4 mt-1 c-pageNavi'>
          {
            1 < offset &&
            <li className='flex bg-white rounded-md shadow-md '>
              <Link href={2 === offset ? `/news/` : `/news/page/${offset-1}`} className='flex items-center px-3 py-2'><FaAngleLeft />
              </Link>
            </li>
          }
          {
            firstFlg && (
              <>
                <li className='flex bg-white rounded-md shadow-md'><Link href='/news/' className='flex items-center px-3 py-2'>1</Link></li>
                <li className='flex bg-white items-center'>...</li>
              </>
            )
          }
          {range(firstPage, lastPage).map((number, index) => (
            <li key={`page-navi-${index}`}
              className={
                twMerge('flex bg-white rounded-md shadow-md', ` ${Number(number) === offset ? ' bg-[#000]' : ''}`)
              }
            >
              {
                Number(number) === offset ? <span className='flex items-center px-3 py-2 text-[#fff]'>{number}</span> : <Link href={1 === number ? `/news/` : `/news/page/${number}`} className='flex items-center px-3 py-2'>{number}</Link>
              }
            </li>
          ))}
          {
            lastFlg && (
              <>
                <li className='flex bg-white items-center'>...</li>
                <li className='flex bg-white rounded-md shadow-md'><Link href={`/news/page/${maxPage}`} className='flex items-center px-3 py-2'>{maxPage}</Link></li>
              </>
            )
          }
          {
            (offset + 1) < maxPage && <li className='flex bg-white rounded-md shadow-md '><Link href={`/news/page/${offset + 1}`} className='flex items-center px-3 py-2'><FaAngleRight /></Link></li>
          }
        </ul>
      </div>
    </>
  )
}
