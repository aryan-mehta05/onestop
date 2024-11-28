import { Typewriter } from 'react-simple-typewriter';

const TypewriterText = () => {
  return (
    <div className='mt-8 px-12 py-8 mb-4'>
      <h1 className="text-7xl font-bold font-playfair text-os-yellow">
        <Typewriter
          words={['Travel', 'Explore', 'Create', 'Experience']}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={120}
          deleteSpeed={80}
          delaySpeed={1000}
        />
        <span className='text-black'> with us,</span>
      </h1>
      {/* Second Line */}
      <h2 className="text-5xl italic font-playfair mt-2 text-gray-800">
        we'll open the doors for you.
      </h2>
    </div>
  )
};

export default TypewriterText;
