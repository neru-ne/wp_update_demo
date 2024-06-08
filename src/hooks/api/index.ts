import { Base64 } from 'js-base64';

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
 * 記事取得
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
