import { Base64 } from 'js-base64';

const DOMAIN = process.env.NEXT_PUBLIC_WPDOMAIN;
const WP_URL =` https://${DOMAIN}`;
const BASIC_ID =  process.env.NEXT_PUBLIC_BASIC_ID as string;
const PASSWORD = process.env.NEXT_PUBLIC_BASIC_PASSWORD as string;


export const getPosts = async (url:string) => {
  
  const result = await fetch(`${WP_URL}${url}`,{
    headers: { Authorization: `Basic ${Base64.encode(`${BASIC_ID}:${PASSWORD}`)}` }
  })
  .then((res)=>{
    return res.json(); 
  }).catch((error)=>{
    throw new Error(`Error : ${error}`);
  })
  return result;
}