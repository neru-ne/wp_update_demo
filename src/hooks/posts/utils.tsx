import { categoryType } from '@/types/api';

export const setCategoryDom = (categories: categoryType[],categoryId: string) => {
  let thisCategory = null;
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].id === categoryId) {
      thisCategory = {
        id: categories[i].id,
        name: categories[i].name,
        slug: categories[i].slug,
      }
    }
  }
  if (thisCategory === null) {
    return '';
  }

  return (
    <span className={`bg-[#0177a9] text-[#fff] rounded p-1 text-[14px] ${thisCategory.slug}`}>
      <a href={`/news/category/${thisCategory.slug}`}>{thisCategory.name}</a>
    </span>
  )
}
