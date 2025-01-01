import React, { createContext, useState, useContext } from 'react';

// Create context
const PayoutContext = createContext();

// Create provider component
export const PayoutProvider = ({ children }) => {
  const [payouts, setPayouts] = useState([]);

  // Function to handle card click
  const handleCardClick = (name, url) => {
    setPayouts((prevPayouts) => {
      // Check if the url already exists in the array
      const existingPayout = prevPayouts.find((payout) => payout.url === url);
      if (existingPayout) {
        // If URL exists, return the previous state without adding
        return prevPayouts;
      }
      // Otherwise, add the new name and url to the array
      return [...prevPayouts, { name, url }];
    });
  };

  return (
    <PayoutContext.Provider value={{ payouts, handleCardClick }}>
      {children}
    </PayoutContext.Provider>
  );
};

// Custom hook to use context
export const usePayoutContext = () => {
  return useContext(PayoutContext);
};
