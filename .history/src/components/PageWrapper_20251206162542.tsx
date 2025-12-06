import React from 'react';
import BackButton from './Navigation/BackButton';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <div className={`p-4 md:p-6 ${className}`}>
      <div className="mb-4">
        <BackButton />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default PageWrapper;
