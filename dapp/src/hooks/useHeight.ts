import React from 'react';

/**
 * @name useHeight
 * @description Use to determine the height in the window and return height
 * to use in CSS calc() func for Editor and other interfaces
 */
export const useHeight = () => {
  const [height, setHeight] = React.useState(window.innerHeight);
  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(window.innerHeight);
    });
  }, []);
  return height;
};

export default useHeight;
