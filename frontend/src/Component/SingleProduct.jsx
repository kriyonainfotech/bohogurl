import React from 'react'
import "../Style/SingleProduct.css";

import black from "../Images/black.png";
import img1 from "../Images/img1.png";
import img2 from "../Images/img2.png";
import img3 from "../Images/img3.png";
import img4 from "../Images/img4.png";
import img5 from "../Images/img5.png";



const SingleProduct = () => {
  return (
    <>
        <div className="containersp">
            <div className='imagecontainer'>
              <img src={black} alt="" className='imagesmall'/>
              <img src={black} alt="" className='imagebig'/>
            </div>

            <div className="inner-container">
              <div className="firstline">
                <h1>Heart Pendant</h1>
                <i class="fa-regular fa-heart" id='iconlike'></i>
              </div>
              
              <p className='iprice'>₹ 100.00</p>
              <p className='idesc'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias magnam corporis ullam vel, nulla amet doloremque beatae et magni Lorem ipsum dolor sit amet. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, at.</p>

              <div className="btn-container">
                <button className='addtocart'>Add to Cart</button>
                <button className='buynow'>Buy Now</button>
              </div>

                <div className="details-line">
                    <div className="details-inner">
                        <div className='details'><a href="">Details</a></div>
                        <button className='btn-bg-triangle'><i class="fa-solid fa-angles-down" id='det'></i></button>
                    </div>  
                  <hr />
                    <div className="details-inner">
                        <div className='details'><a href="">Tips & Warning</a></div>
                        <button className='btn-bg-triangle'><i class="fa-solid fa-angles-down" id='tips'></i></button>
                    </div>
                  <hr />
                </div>
            </div>
        </div>


        <div className="">
          <p className='recommand'> Recommended For You</p>
          <p className='based-on-choice'>Based On Choice</p>
        
          <div className='recommand-container'>
                              <div className="recommand-product">
                                  <img src={img1} alt="" className='recommand-img' />
                                  <p>HEART STONE</p>
                                  <p className='recommand-price'>₹200.00</p>
                              </div>

                              <div className="recommand-product">
                                  <img src={img2} alt="" className='recommand-img' />
                                  <p>HEART STONE</p>
                                  <p className='recommand-price'>₹200.00</p>
                              </div>
                              <div className="recommand-product">
                                  <img src={img3} alt="" className='recommand-img' />
                                  <p>HEART STONE</p>
                                  <p className='recommand-price'>₹200.00</p>
                              </div>
                              <div className="recommand-product">
                                  <img src={img4} alt="" className='recommand-img' />
                                  <p>HEART STONE</p>
                                  <p className='recommand-price'>₹200.00</p>
                              </div>
                              <div className="recommand-product">
                                  <img src={img5} alt="" className='recommand-img' />
                                  <p>HEART STONE</p>
                                  <p className='recommand-price'>₹200.00</p>
                              </div>
                             
        
            </div>
        </div>
    </>
  )
}

export default SingleProduct;
