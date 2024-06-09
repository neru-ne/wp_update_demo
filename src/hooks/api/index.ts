import { Base64 } from 'js-base64';
//types
import { allPostsType } from '@/types/api';

const PER_PAGE = Number(process.env.NEXT_PUBLIC_PER_PAGE);//1ページにつき、いくつ記事を入れるか


const DOMAIN = process.env.NEXT_PUBLIC_WPDOMAIN;
const WP_URL =` https://${DOMAIN}`;
const BASIC_ID =  process.env.NEXT_PUBLIC_BASIC_ID as string;
const PASSWORD = process.env.NEXT_PUBLIC_BASIC_PASSWORD as string;
const headers = {
  headers: { Authorization: `Basic ${Base64.encode(`${BASIC_ID}:${PASSWORD}`)}` }
}

export class setApi {
  constructor() {

  }

  /**
   * 記事一覧取得
   * @param url
   * @returns
   */
  getPosts = async (url: string) => {
    const result = await fetch(`${WP_URL}${url}`, headers)
      .then((res) => {
        return res.json();
      }).catch((error) => {
        throw new Error(`Error : ${error}`);
      })
    return result;
  }

/**
* 全記事取得（カスタムAPI）
* @returns
*/
  getAllPosts = async () => {
    const result = await fetch(`${WP_URL}/wp-json/custom/v1/allposts`, headers)
      .then((res) => {
        return res.json();
      }).catch((error) => {
        throw new Error(`Error : ${error}`);
      })
    return result;
  }

  getPagePosts = (allPosts: allPostsType[],nowPage:number) => {
    const allPostNum = allPosts.length;
    let maxPage = Math.ceil(allPostNum / PER_PAGE); //全ページ数

    // 現在のページ数が1より小さい場合は1に、maxPageより大きい場合はmaxPageに補正する
    nowPage = Math.max(1, Math.min(nowPage, maxPage));

    const start = (nowPage - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    let result = allPosts.slice(start,end);

    return result;
  }


/**
 * 記事取得
 * @param id
 * @returns
 */
  getPost = async (id: string) => {
    const result = await fetch(`${WP_URL}/wp-json/wp/v2/posts/${id}`, headers)
      .then((res) => {
        return res.json();
      }).catch((error) => {
        throw new Error(`Error : ${error}`);
      })
    return result;
  }

  /**
   * カテゴリ一覧取得
   * @returns
   */
  getCategories = async () => {
    const result = await fetch(`${WP_URL}/wp-json/wp/v2/categories`, headers)
      .then((res) => {
        return res.json();
      }).catch((error) => {
        throw new Error(`Error : ${error}`);
      })
    return result;
  }

}
