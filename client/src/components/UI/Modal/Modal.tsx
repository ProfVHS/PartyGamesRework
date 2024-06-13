import './ModalStyle.scss';

import { motion } from 'framer-motion';

type ModalProps = {
  children: React.ReactNode;
};

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className="modal">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0 }}
        className="modal__backdrop"
        onClick={() => console.log('exit')}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.3, delay: 0.3 },
        }}
        exit={{ opacity: 0, scale: 0 }}
        className="modal__content"
      >
        {children}
      </motion.div>
    </div>
  );
};
