import { motion } from 'motion/react';
import type { FC, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

/** 
 * Senior Design Engineering Scroll Reveal:
 * - Subtle travel (16px max) so it feels snappy, not floaty
 * - Custom ease-out curve (cubic-bezier(0.23, 1, 0.32, 1))
 * - Starts from scale(0.98) with opacity 0 (nothing appears from scale(0))
 * - Hardware-accelerated transform & opacity
 */
const Reveal: FC<RevealProps> = ({ children, delay = 0, className, y = 16 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.23, 1, 0.32, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
