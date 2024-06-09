import { categoryType } from '@/types/api';
import { twMerge } from 'tailwind-merge';


export const SetCategoryDom = (categories: categoryType[],categoryId: string) => {
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
    <span className={`${thisCategory.slug} bg-[#005376] text-[#fff] rounded p-2 text-[14px] block`}>
      {thisCategory.name}
    </span>
  )
}
