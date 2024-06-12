import React, { TextareaHTMLAttributes, forwardRef } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  height?: number;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, height = 20, ...props }, ref) => {
    const calculateTextareaHeight = (element: HTMLTextAreaElement) => {
      if (!element) return;
      element.style.height = 'auto';
      element.style.height = `${height}px`;
      element.style.height = `${element.scrollHeight}px`;
    };

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      calculateTextareaHeight(event.target);
      if (props?.onChange) {
        props.onChange(event);
      }
    };

    return (
      <textarea
        className={className}
        style={{ height: `${height}px` }}
        ref={ref}
        {...props}
        onChange={handleTextareaChange}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
