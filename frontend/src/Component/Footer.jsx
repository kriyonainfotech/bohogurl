import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className="bg-[#f9f5f1] text-gray-800 py-10 px-5 font-sans">
        <div className=" flex flex-col md:flex-row justify-between gap-10">
          {/* Information Section */}
          <div className="md:ml-20 flex-1 min-w-[200px]">
            <h4 className="text-[14px] font-bold mb-4" style={{fontFamily:'Cormorant Garamond'}}>INFORMATION</h4>
            <ul className="space-y-2 font-[Karla] text-[13px]">
              <li><a href="/contact-us" className="hover:text-[#7d6b64]">Contact Us</a></li>
              <li><a href="/about-us" className="hover:text-[#7d6b64]">About Us</a></li>
              <li><a href="/new-arrivals" className="hover:text-[#7d6b64]">New Arrivals</a></li>
              <li><a href="/collection" className="hover:text-[#7d6b64]">Collection</a></li>
            </ul>
          </div>

          {/* Products Section */}
          <div className=" flex-1 min-w-[200px]">
            <h4 className="text-[14px] font-bold mb-4" style={{fontFamily:'Cormorant Garamond'}}>PRODUCTS</h4>
            <ul className="space-y-2 font-[Karla] text-[13px]">
              <li><a href="/necklaces" className="hover:text-[#7d6b64]">Necklaces</a></li>
              <li><a href="/earrings" className="hover:text-[#7d6b64]">Earrings</a></li>
              <li><a href="/bracelet" className="hover:text-[#7d6b64]">Bracelet</a></li>
              <li><a href="/rings" className="hover:text-[#7d6b64]">Rings</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="footer-section flex-1 min-w-[200px]">
            <h4 className="text-[14px] font-bold mb-4" style={{fontFamily:'Cormorant Garamond'}}>SOCIAL MEDIA</h4>
            <div className="social-icons flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-xl hover:text-[#7d6b64]"><i className="fab fa-instagram"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-xl hover:text-[#7d6b64]"><i className="fab fa-twitter"></i></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-xl hover:text-[#7d6b64]"><i className="fab fa-facebook"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-xl hover:text-[#7d6b64]"><i className="fab fa-youtube"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-xl hover:text-[#7d6b64]"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section flex-1 min-w-[200px] " style={{fontFamily:'Cormorant Garamond'}}>
            <h4 className="text-lg font-bold mb-2">You can be one step ahead.</h4>
            <p>Sign up to hear about our updates on the dot.</p>
            <div className="newsletter-form flex mt-3">
              <input 
                type="email"
                placeholder="Your email address"
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-gray-400"
              />
              <button 
                type="button"
                className="bg-[#BEBEBE] text-white px-4 py-2 rounded-r-md hover:bg-[#7d6b64]"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom mt-10 text-center text-sm text-[#7d6b64]">
          <p>©2025 BOHO GURL</p>
          <div className="footer-links mt-3 flex justify-center gap-3">
            <a href="/privacy-policy" className="hover:text-gray-800">Privacy Policy</a>
            <span>•</span>
            <a href="/terms-of-use" className="hover:text-gray-800">Terms of Use</a>
            <span>•</span>
            <a href="/shipping-policy" className="hover:text-gray-800">Shipping Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
