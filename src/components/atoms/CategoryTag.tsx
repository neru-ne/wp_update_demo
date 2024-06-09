import { categoryType } from '@/types/api';

export const CategoryTag = (props: { categories: categoryType[], categoryId: string }) => {

  const { categories, categoryId } = props;

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
    <div className={`block bg-[#005376] text-[#fff] rounded p-1 text-[14px] ${thisCategory.slug}`}>
      {thisCategory.name}
    </div>
  )
}
