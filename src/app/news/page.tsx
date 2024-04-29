import { getPosts } from '@/app/api/'

export default async function News() {

  type postsType = {
    id: string;
    title: { rendered: string };
    content: { rendered: string, protected: boolean },
  };


  const getAllPosts = await getPosts("/wp-json/wp/v2/posts?per_page=100&page=1") as postsType[];

  return (
    <>
      <div className='p-10'>
        <ul>
          {
            getAllPosts.map((item, index) => {
              return (
                <li key={`postList-${index}`} className='border-b-2 border-black'>
                  <div className='pb-4'>
                    <p>id: {item.id}</p>
                    <p>title: {item.title.rendered}</p>
                    <p>content: {item.content.protected}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  )
}