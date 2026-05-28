import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Parallax, EffectFade } from 'swiper/modules';
import { ShoppingBag, Star, Award, Shield, Truck, Instagram, Facebook, MessageCircle } from 'lucide-react';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
      setProducts(res.data.slice(0, 8));
      setFeaturedProducts(res.data.filter(p => p.featured).slice(0, 4));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const testimonials = [
    { name: 'Sheikh Ahmed Al Maktoum', text: 'The Royal Oud is absolutely magnificent. A true masterpiece of Arabic perfumery.', rating: 5, location: 'Dubai, UAE' },
    { name: 'Princess Layla', text: 'Black Musk has become my signature scent. Long-lasting and incredibly luxurious.', rating: 5, location: 'Riyadh, KSA' },
    { name: 'Mr. James Wilson', text: 'Exceptional quality. The gold packaging and the fragrance itself are worth every penny.', rating: 5, location: 'London, UK' },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Gold Smoke Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gold-500/10 blur-3xl animate-gold-smoke"
              style={{
                width: `${300 + i * 100}px`,
                height: `${300 + i * 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src="/logo.png" alt="AL NASR" className="w-32 h-32 mx-auto mb-8" />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif gold-text mb-4">
              Experience Royal Fragrance
            </h1>
            <p className="text-xl md:text-2xl text-white/80 tracking-wider mb-8">
              Luxury Arabic Attars Crafted for Elegance
            </p>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="premium-button text-lg"
              >
                Explore Collection
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gold-500/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold-500 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif gold-text mb-4">Featured Collections</h2>
            <div className="w-24 h-0.5 bg-gold-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.bestseller && (
                    <span className="absolute top-4 right-4 bg-gold-500 text-black px-3 py-1 text-sm font-semibold rounded-full">
                      BESTSELLER
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-white mb-2">{product.name}</h3>
                  <p className="text-gold-500 text-2xl font-bold mb-4">₹{product.price}</p>
                  <Link to={`/product/${product._id}`}>
                    <button className="w-full bg-gold-500/10 border border-gold-500/30 text-gold-500 py-2 rounded-full hover:bg-gold-500 hover:text-black transition-all duration-300">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-gradient-to-b from-black to-gold-900/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif gold-text mb-4">Best Sellers</h2>
            <p className="text-white/60 text-lg">Most loved fragrances by our customers</p>
          </motion.div>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 3000 }}
            loop={true}
          >
            {products.filter(p => p.bestseller).map((product) => (
              <SwiperSlide key={product._id}>
                <div className="glass-card p-6 text-center">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-serif text-white mb-2">{product.name}</h3>
                  <p className="text-gold-500 text-xl font-bold">₹{product.price}</p>
                  <button className="mt-4 w-full bg-gold-500 text-black py-2 rounded-full hover:bg-gold-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Truck size={40} />, title: 'Free Shipping', desc: 'On orders above ₹5000' },
              { icon: <Award size={40} />, title: 'Premium Quality', desc: '100% authentic attars' },
              { icon: <Shield size={40} />, title: 'Secure Payment', desc: '100% secure transactions' },
              { icon: <Star size={40} />, title: 'Luxury Packaging', desc: 'Royal gift packaging' },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center glass-card p-6"
              >
                <div className="text-gold-500 mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-serif text-white mb-2">{benefit.title}</h3>
                <p className="text-white/60">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-t from-black to-gold-900/5">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-serif gold-text text-center mb-12"
          >
            Royal Testimonials
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex text-gold-500 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="text-white/80 italic mb-4">"{testimonial.text}"</p>
                <p className="text-gold-500 font-semibold">{testimonial.name}</p>
                <p className="text-white/50 text-sm">{testimonial.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-900/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card p-12 text-center max-w-3xl mx-auto"
          >
            <h3 className="text-3xl font-serif gold-text mb-4">Royal Newsletter</h3>
            <p className="text-white/70 mb-6">Subscribe to receive exclusive offers and first access to new collections</p>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-gold-500/30 rounded-full px-6 py-3 text-white placeholder-white/50 focus:outline-none focus:border-gold-500"
              />
              <button className="premium-button px-8">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919876543210?text=Hello%20AL%20NASR%20Fragrances"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 rounded-full p-4 shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle size={32} className="text-white" />
      </a>
    </div>
  );
};

export default HomePage;