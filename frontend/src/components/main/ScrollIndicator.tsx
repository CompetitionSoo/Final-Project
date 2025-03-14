import React from 'react';
import { motion } from 'framer-motion';


const ScrollIndicator: React.FC<{ target: string; position?: string }> = ({
  target,
  position = "bottom-12",
}) => {


  const classValue = {
    "#about": ["flex flex-col items-center text-white", "w-6 h-6 border-2 border-white rounded-full flex items-center justify-center", "w-2 h-2 bg-white rounded-full"],
    "#view": ["flex flex-col items-center text-black","w-6 h-6 border-2 border-black rounded-full flex items-center justify-center", "w-2 h-2 bg-black rounded-full"],
    "#hero": ["flex flex-col items-center text-white", "w-6 h-6 border-2 border-white rounded-full flex items-center justify-center", "w-2 h-2 bg-white rounded-full"]
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className={`absolute ${position} left-1/2 transform -translate-x-1/2`}
    >
      <a href={target}>
        <div className={classValue[target][0]}>
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className={classValue[target][1]}
          >
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className={classValue[target][2]}
            />
          </motion.div>
        </div>
      </a>
    </motion.div>
  );
};

export default ScrollIndicator;