import React from "react";
import backgroundf from '../Images/Img/Back.jpg';
import nec1 from '../Images/nec1.png';
import nec2 from '../Images/Img/Earrring.jpg';
import nec3 from '../Images/Img/Ring.jpg';
import nec4 from '../Images/Img/Afghan.jpg';
import nec5 from '../Images/Img/Glass.jpg';
import stone from '../Images/image4.jpg';
import alp from '../Images/alp.png';

const Home = () => {
  const categories = [
    { name: 'Necklaces', imageUrl: nec1 },
    { name: 'Earrings', imageUrl: nec2 },
    { name: 'Rings', imageUrl: nec3 },
    { name: 'Afghan Jewellery', imageUrl: nec4 },
    { name: 'Glass Jewellery', imageUrl: nec5 },
  ];

  const reviews = [
    {
      text: "Great variety of cuts and amazing customer service. Helped to find the perfect ring and helped me to personalize it a little more.",
      author: "Nico Jones",
    },
    {
      text: "What an amazing shopping experience! I tried other jewelers and didn’t find anything I liked. Thank you so much.",
      author: "Tracy Willis",
    },
    {
      text: "Great quality, and showed they can work through a problem and maintain excellent customer service!!",
      author: "Susana Santos",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[750px] flex justify-start items-center" style={{ backgroundImage: `url(${backgroundf})` }}>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative md:ml-[200px] z-10">
          <h1 className="text-white font-cormorant text-6xl mb-6" style={{ fontFamily: 'Cormorant Garamond' }}>
            The Beauty Of Women
          </h1>
          <p className="text-white text-lg mb-4 font-[Karla]">Shop for our new releases starting today.</p>
          <button className="bg-[#705B4F] text-white px-6 py-2 hover:bg-gray-700">BUY NOW</button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories text-center py-10">
        <h2 className="text-[40px] mb-4" style={{ fontFamily: 'Cormorant Garamond' }}>Shop by category</h2>
        <p className="italic text-[28px] mb-8" style={{ fontFamily: 'Cormorant Garamond' }}>Indulge in what we offer.</p>
        <div className="category-list flex flex-wrap justify-center gap-8">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <img src={category.imageUrl} alt={category.name} className="h-[279px] w-[249px] transition-transform transform hover:scale-110 shadow-md" />
              <p className="mt-2 text-xl">{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Handcrafted Section */}
      <div className="w-full flex md:flex-row flex-col text-center items-center text-justify">
        <div className="md:w-[50%] w-full h-[300px] md:h-[682px] bg-[#705B4F] text-white md:p-[100px] p-[50px]">
          <h1 className="md:text-[54px] text-[25px] font-[900] font-[Lato]">Hand Crafted fine pieces.</h1><br />
          <p className="md:text-[28px] text-[12px] font-[700] font-[Lato]">We also firmly believed that our customers deserved more choices, straightforward information and legendary service.</p><br />
          <button className="w-[170px] md:h-[42px] h-[30px] bg-white text-[#002D69] rounded-[4px]" onClick={() => navigate("/category")}>SHOP NOW</button>
        </div>
        <div className="md:w-[50%] w-full md:h-[682px] relative">
          {/* Background Color */}
          <div className="absolute inset-0 bg-[#705B4F] opacity-50"></div>
          {/* Image */}
          <img src={stone} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      <br /><br /><br />

      {/* Latest Jewelry Section */}
      <section className="categories text-center py-10">
        <h2 className="font-cormorant text-4xl mb-8">Our Latest Jewelry</h2>
        <div className="category-list flex flex-wrap justify-center gap-8">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <img src={category.imageUrl} alt={category.name} className="h-[279px] w-[249px] transition-transform transform hover:scale-110 shadow-md" />
              <p className="mt-2 text-xl">{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="reviews-container bg-white py-10 px-5">
        <h2 className="text-center text-[#5a4634] text-3xl mb-8">CUSTOMER REVIEWS</h2>
        <div className="reviews-grid flex flex-wrap justify-center gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="review-card bg-white border border-gray-300 p-6 shadow-md transition-shadow hover:shadow-lg md:w-[392px] w-[300px] h-[225px]">
              <img src={alp} alt={`Review ${index}`} />
              <blockquote className="italic mt-4 font-[Lato] text-[#343434]">“{review.text}”</blockquote>
              <p className="font-bold mt-4 font-[Karla] italic">- {review.author}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;