import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import HomeContents from '../HomeContents';

function Home() {
  return (
    <>
      <HeroSection />
      <HomeContents />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
