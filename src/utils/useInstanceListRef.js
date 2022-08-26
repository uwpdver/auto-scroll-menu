import React from 'react';

export const useInstanceListRef = (ref) => {
  const instanceListRef = React.useRef([]);
  const getInstanceRef = (ref, index) => {
    if (
      instanceListRef.current &&
      Array.isArray(instanceListRef.current)
    ) {
      instanceListRef.current[index] = ref;
    }
  };
  return [instanceListRef,getInstanceRef];
};