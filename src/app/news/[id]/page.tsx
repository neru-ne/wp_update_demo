import parse from 'html-react-parser';

import { CategoryTag } from '@/components/atoms/CategoryTag'

//hooks
import { setApi } from '@/hooks/api';

//types
import { allPostsType, postsType } from '@/types/api';


export async function generateStaticParams() {
  const api = new setApi();

  const getAllPostList: allPostsType[] = await api.getAllPosts();

  return getAllPostList.map((post) => ({
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
                        <CategoryTag categories={categories} categoryId={category} />
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
