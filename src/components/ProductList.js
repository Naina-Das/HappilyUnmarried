import { Button } from 'antd';
import { useContext, useState } from 'react';
import '../css/ProductList.css';
import { GlobalContext } from '../Provider/GlobalContext';
import {
  StarOutlined
} from '@ant-design/icons';
export const ProductList = () => {
  const context = useContext(GlobalContext);
  const loadMore = () => {
    context.setLimit(context.limit + 3);
  }
  const getPercentageOff = (originalPrice, discoundetPrice) => {
    return Math.round(100/((originalPrice/ (originalPrice - discoundetPrice))));
  }
  return (
    <div className="row-container">
        {
          context.data.slice(0, context.limit).map((product, index) => {
            return (
              <div className="product-container" key={index}>
          <div>
            <div className="product-wrapper">
              <div className="image-container">
                <a className="link">
                  <img className="image" src={product.image_urls_webp.x520} alt={product.alt_text}></img>
                </a>
                {
                  product.rating && <div className="rating-container">
                  <div className="rating">
                    <span className="rating-text">{product.rating}<StarOutlined /></span>
                    <Button className="rating-btn"></Button>
                    {/* <svg viewBox="0 0 24 24" style="display: inline-block; color: rgba(0, 0, 0, 0.87); fill: rgb(255, 255, 255); height: 24px; width: 24px; user-select: none; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg> */}
                  </div>
                </div>
                }
                <div className="discount-container">
                  <div className="disc disc_lg disc_circle">
                    <div>
                      {getPercentageOff(product.price_new, product.final_price)}
                      <p className="disc_subtext">
                        %
                        <br/>
                        off
                      </p>
                    </div>
                  </div>
                  <div className="cb cb_lg">
                    <span>{product.cashback_percentage} % Cashback</span>
                  </div>
                </div>
              </div>
              <div className="info-container">
                <div className="product-info">
                <a href="/monthly-essential-kit-3/p" style={{textDecoration: "none", color: "inherit", position: "relative", zIndex: 1, overflow: "hidden", display: "contents"}}><div class="ProductNameWrapper-iwxtYe gdGEYb"><p class="ProductName-jSpGJK lbLJAr">{product.name}</p></div></a>
                <div className="product-stats">
                  <div className="price-box">
                    <p className="special-price">₹{product.final_price}</p>
                    <p className="price">
                      <del>
                      ₹ {product.price_new}
                      </del>
                      <b>Save ₹{product.price_new - product.final_price} ({getPercentageOff(product.price_new, product.final_price)}% OFF)</b>
                    </p>
                  </div>
                  <div className="cashbox">
                      {product.cashback_percentage}% (₹{product.cashback_amount}) Cashback
                  </div>
                </div>
                <div className="action">
                  <div>
                    <button className={product.is_in_stock ? 'bg-active' : 'bg-inactive'}>
                      <div>
                        <span className="text">add to cart</span>
                      </div>
                    </button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
            )
          })
        }
        <div style={{display: "flex", justifyContent:"center", width: "100%"}}>
          { context.limit <= context.data.length && <Button type="primary" onClick={loadMore}>Load More</Button>}
        </div>
    </div>
  )
}