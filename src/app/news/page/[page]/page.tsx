import parse from 'html-react-parser';

//components
import { PageNavi } from '@/components/atoms/PageNavi'

//hooks
import { setApi } from '@/hooks/api';
import { SetCategoryDom } from '@/hooks/posts/utils';
import { range } from '@/hooks/utils';


//types
import { allPostsType } from '@/types/api';


export async function generateStaticParams() {

  const PER_PAGE = Number(process.env.NEXT_PUBLIC_PER_PAGE);//1ページにつき、いくつ記事を入れるか

  const api = new setApi();

  const getAllPostList: allPostsType[] = await api.getAllPosts();
  const totalCount = getAllPostList.length;

  const pathsRange = range(2, Math.ceil(Number(totalCount) / PER_PAGE))

  return pathsRange.map((num) => ({
    page: num.toString(),
  }))
}

export default async function NewsPage({ params }: { params: { page: number } }) {

  const { page } = params;

  const api = new setApi();
  const getAllPostList: allPostsType[] = await api.getAllPosts();
  const resultPosts: allPostsType[] = await api.getPagePosts(getAllPostList, page);
  const categories = await api.getCategories();

  return (
    <>
      <div className='p-10'>
        <ul>
          {
            resultPosts.map((item, index) => {
              return (
                <li key={`postList-${index}`} className='border-b-2 border-black mb-2'>
                  <div className='pb-4 block'>
                    <p>id: {item.id}</p>
                    <p>title:
                      <a href={`/news/${item.id}`} className='underline'>{item.title}</a>
                    </p>
                    <div>content: {parse(item.content)}</div>
                    <ul className='flex gap-[4px] mt-[12px] '>
                      {
                        item.category.map((category, index2) => {
                          return (
                            <li key={`categories-${index2}`} className='' >
                              {SetCategoryDom(categories, category)}
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
      <PageNavi nowPage={params.page} allPosts={getAllPostList.length} />
    </>
  )
}
