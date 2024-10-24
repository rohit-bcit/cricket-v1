import React from 'react';
import { useRef, useState, useEffect } from 'react';
import {cricdata} from '../assets/data.js';
import Card from './Card.jsx';

function Slider() {
  const cardRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0); // State to track active index

  const cards = cricdata.tournaments.flatMap(tournament =>
      tournament.matches.map(match => ({ tournament, match }))
  );

  const scrollToIndex = (index) => {
      const cardWidth = cardRef.current.offsetWidth;
      cardRef.current.scrollTo({
          left: index * cardWidth,
          behavior: 'smooth'
      });
      setActiveIndex(index); // Update active index
  };

  // Update active index based on scroll position
  const handleScroll = () => {
      const scrollLeft = cardRef.current.scrollLeft;
      const cardWidth = cardRef.current.offsetWidth;
      const newActiveIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newActiveIndex);
  };

  useEffect(() => {
      const currentRef = cardRef.current;
      currentRef.addEventListener('scroll', handleScroll);

      return () => {
          currentRef.removeEventListener('scroll', handleScroll);
      };
  }, []);
  return (
    <>
      <div className='bg-[#F5F5F5] py-[20px] px-[10px] '>
      <div className="relative w-full flex  flex-col items-center">
            <div ref={cardRef} className="flex whitespace-nowrap overflow-x-scroll scrollbar-hide w-full max-w-[325px]">
                {cards.map((match, index) => (
                    <Card key={index} match={match} />
                ))}
            </div>
            <div className="flex justify-center mt-3">
                {cards.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => scrollToIndex(index)} 
                        className={`mx-1 w-[6px] h-[6px] rounded-full ${activeIndex === index ? 'bg-[#0D8888]' : 'bg-[#DFDFDF]'} hover:bg-[#0D8888]`}
                    />
                ))}
            </div>
        </div>



      </div>
    </>
  );
}

export default Slider;
