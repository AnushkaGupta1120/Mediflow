import React from "react";
import BackButton from "./Navigation/BackButton";

interface Props {
  children: React.ReactNode;
  className?: string;
  showBack?: boolean; // NEW
}

const PageWrapper: React.FC<Props> = ({ children, className = "", showBack = false }) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Show back button only when needed */}
      {showBack && (
        <div className="mb-2">
          <BackButton />
        </div>
      )}

      {/* Main content */}
      <div className="px-4 md:px-6"> 
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
