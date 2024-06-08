import parse from 'html-react-parser';


//components
import { PageNavi } from '@/components/atoms/PageNavi'

//hooks
import { setApi } from '@/hooks/api';
import { setCategoryDom } from '@/hooks/posts/utils'

//types
import { postsType } from '@/types/api';


export default async function News() {

  const api = new setApi();

  const getPostList: postsType[] = await api.getPosts("/wp-json/wp/v2/posts?per_page=1&page=1");

  const categories = await api.getCategories();

  return (
    <>
      <div className='p-10'>
        <ul>
          {
            getPostList.map((item, index) => {
              return (
                <li key={`postList-${index}`} className='border-b-2 border-black'>
                  <div className='pb-4 block'>
                    <p>id: {item.id}</p>
                    <p>title:
                      <a href={`/news/${item.id}`} className='underline'>{item.title.rendered}</a>
                    </p>
                    <div>content: {parse(item.content.rendered)}</div>
                    <ul className='flex gap-[4px] mt-[12px]'>
                      {
                        item.categories.map((category, index2) => {
                          return (
                            <li key={`categories-${index2}`} >
                              {setCategoryDom(categories,category)}
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
      <PageNavi/>
    </>
  )
}
