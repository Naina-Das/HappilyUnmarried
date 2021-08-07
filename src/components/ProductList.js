import { Button } from 'antd';
import { useContext, useState } from 'react';
import '../css/ProductList.css';
import { GlobalContext } from '../Provider/GlobalContext';
export const ProductList = () => {
  const context = useContext(GlobalContext);
  const loadMore = () => {
    context.setLimit(context.limit + 3);
  }
  return (
    <div class="gallery">
      {
        context.data.slice(0, context.limit).map((product, index) => {
          return (
            <div class="content" key={product.id}>
              <img src={product.image_urls_webp.x520} alt={product.alt_text}/>
              <h3>{product.name}</h3>
              <div>({product.weight} {product.weight_unit})</div>
              <h6>₹ {product.final_price} <span style ={{textDecoration: "line-through", fontSize: "12px"}}>₹ {product.final_price_new}</span></h6>
              <ul>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                <li><i class="fa fa-star" aria-hidden="true"></i></li>
              </ul>
              <button class="buy-1">Add To Cart</button>
            </div>
          )
        })
      }
      {
        (context.limit <= context.data.length) && <Button type="primary" onClick = {loadMore} style={{width: "300px"}}>Load More</Button>
      }
    </div>
  )
}