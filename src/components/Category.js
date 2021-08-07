import { useContext, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { GlobalContext } from '../Provider/GlobalContext';

export const Category = () => {
  const context = useContext(GlobalContext);
  useEffect(() => {
    async function getCategories() {
      const data = await fetch('https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob');
      const categoriesData = await data.json();
      context.setCategories(categoriesData.category_list);
      context.setCategory(categoriesData.category_list[0]);
      context.setData(categoriesData.product_list.products);
    }
    getCategories();
  }, []);

  const getSelectedItemIndex = () => {
    const categories = context.categories || [];
    const selectedCategory = context.category;
    return categories.findIndex(category => selectedCategory.category_id === category.category_id);
  }
  useEffect(() => {
    (async () => {
      const products = await fetchProduct(context.category);
      context.setData(products.products || []);
      context.setLimit(3);
    })()
  }, [context.category]);

  const fetchProduct = async(category) => {
    const data = await fetch(`https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=${category.category_id}`);
    const productData = await data.json();
    return productData;
  }
  const setCategoryAndGetProduct = async(category) => {
    context.setCategory(category);
  }
  const onChangeSlide = async(index, item) => {
    const category = context.categories[index];
    context.setCategory(category);
  }
  return (
    <div className="">
      <h3>Our Products</h3>
      <Carousel centerMode={true} centerSlidePercentage={32.5} autoFocus={true} style={{marginRight: "15px"}} onChange={onChangeSlide} selectedItem={getSelectedItemIndex()}>
      {
        // console.log('context.categories', context.categories)
        context.categories.map((category, index) => {
          return (
            <div key={category.category_id + index} onClick={() => setCategoryAndGetProduct(category)}>
            <img src={category.category_image} />
            <p className="legend">{category.category_name}</p>
        </div>
          )
        })
      }
    </Carousel>
    <div>
      <div className="category-name" style={{    display: "flex",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "30px"}}>
        {context.category.category_name}
      </div>
      <div style={{ display: "flex",
        justifyContent: "center",
        fontWeight: 400,
        fontSize: "16px", borderBottom: "solid 1px #f0f0f0", marginTop: "4px",
        marginBottom: "4px"}}>
        Awesome Products. Lot Of Savings
      </div>
    </div>
    </div>
    
);
}