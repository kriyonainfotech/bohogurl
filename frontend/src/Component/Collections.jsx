import React from "react";

import nec1 from '../Images/nec1.png';
import nec2 from '../Images/nec2.png';
import nec3 from '../Images/nec3.png';
import nec4 from '../Images/nec4.png';
import nec5 from '../Images/nec5.png';
import nec6 from '../Images/nec6.png';
import nec7 from '../Images/nec7.png';

const Collections = () => {
  const col = [
    { name: 'Necklaces', imageUrl: nec1 },
    { name: 'Earrings', imageUrl: nec2 },
    { name: 'Rings', imageUrl: nec3 },
    { name: 'Afghan Jewellery', imageUrl: nec4 },
    { name: 'Glass Jewellery', imageUrl: nec5 },
    { name: 'Bracelet-Kada', imageUrl:nec6},
    { name: 'Patches', imageUrl:nec7}
  ];

  return (
    <> <br /><br />
      <div>
        <section className="text-center font-serif mt-10">
          <h2 className="text-[40px] font-[400] text-black">Our Collection</h2>
          <p className="text-[15px] text-gray-600 mt-2 font-[Karla]">OUR HOME MADE PRODUCTS</p>
          <div className="flex flex-wrap gap-8 justify-center mt-8">
            {col.map((category, index) => (
              <div key={index} className="group">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-[276px] w-[249px]  object-cover rounded-lg cursor-pointer transition-transform duration-300 group-hover:scale-110 shadow-md"
                />
                <p className="mt-4 text-lg font-medium text-gray-800" style={{fontFamily:'Cormorant Garamond'}}>{category.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div><br />  

      
    </>
  );
};

export default Collections;
