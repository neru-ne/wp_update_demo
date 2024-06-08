import parse from 'html-react-parser';

//hooks
import { setApi } from '@/hooks/api';
import { setCategoryDom } from '@/hooks/posts/utils'

//types
import { postsType } from '@/types/api';


export async function generateStaticParams() {
  const api = new setApi();

  const getPostList: postsType[] = await api.getPosts("/wp-json/wp/v2/posts?per_page=100&page=1");

  return getPostList.map((post) => ({
    id: post.id.toString(),
  }))
}

export default async function Post(
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const api = new setApi();
  const post: postsType = await api.getPost(id);

  const categories = await api.getCategories();

  return (
    <>
      <div className='p-10'>
        {
          post && (
            <div>
              <p>id: {post.id}</p>
              <p>title: {post.title.rendered}</p>
              <div>content: {parse(post.content.rendered)}</div>
              <ul className='flex gap-[4px] mt-[12px]'>
                {
                  post.categories.map((category, index) => {
                    return (
                      <li key={`categories-${index}`} >
                        {setCategoryDom(categories,category)}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )
        }
      </div>
      <div className='text-center underline'>
        <a href="/news/">記事一覧へ戻る</a>
      </div>
    </>
  )
}
