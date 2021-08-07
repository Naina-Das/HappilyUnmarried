import { useContext, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { GlobalContext } from '../Provider/GlobalContext';

export const Category = () => {
  const [categories, setCategory] = useState([]);
  const context = useContext(GlobalContext);
  useEffect(() => {
    async function getCategories() {
      const data = await fetch('https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob');
      const categoriesData = await data.json();
      setCategory(categoriesData.category_list);
      context.setData(categoriesData.product_list.products);
    }
    getCategories();
  }, []);

  const setCategoryAndGetProduct = async(categoryId) => {
    const data = await fetch(`https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=${categoryId}`);
    const productData = await data.json();
    context.setData(productData.products);
    context.setLimit(3);
  }
  return (
    <div className="">
      <h3>Our Products</h3>
      <Carousel centerMode={true} centerSlidePercentage={32.5} autoFocus={true} style={{marginRight: "15px"}}>
      {
        categories.map((category, index) => {
          return (
            <div key={category.category_id} onClick={() => setCategoryAndGetProduct(category.category_id)}>
            <img src={category.category_image} />
            <p className="legend">{category.category_name}</p>
        </div>
          )
        })
      }
    </Carousel>
    </div>
    
);
}