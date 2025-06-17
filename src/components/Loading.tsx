import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { motion } from 'motion/react';

const Loading = () => {
  return (
    <div className=" flex items-center justify-center h-full w-full p-8">
      <motion.div
        animate={{ rotate: '360deg' }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <AiOutlineLoading3Quarters size={30} fill="#528aae" />
      </motion.div>
    </div>
  );
};

export default Loading;
