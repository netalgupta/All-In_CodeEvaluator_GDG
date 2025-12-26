'use client';

import { useEffect, useState, useRef } from 'react';

function useAnimatedValue(endValue: number, duration: number = 1500) {
  const [currentValue, setCurrentValue] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    let startValue = 0;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const newAnimatedValue = startValue + progress * (endValue - startValue);
      setCurrentValue(newAnimatedValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(endValue);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [endValue, duration]);

  return currentValue;
}

interface AnimatedNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  precision?: number;
}

export function AnimatedNumber({ value, precision = 0, ...props }: AnimatedNumberProps) {
  const animatedValue = useAnimatedValue(value);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <span ref={ref} {...props}>
      {(hasBeenVisible ? animatedValue : 0).toFixed(precision)}
    </span>
  );
}
