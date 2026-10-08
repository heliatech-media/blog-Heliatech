"use client";

import React from 'react';

export const FadeIn = ({ children, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <div className={className}>
    {children}
  </div>
);

export const FadeInStagger = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={className}>
    {children}
  </div>
);

export const FadeInItem = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={className}>
    {children}
  </div>
);

export const ScaleIn = ({ children, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <div className={className}>
    {children}
  </div>
);
