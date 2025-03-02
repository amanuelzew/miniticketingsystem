import  { FC, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'default';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: FC<ButtonProps> = ({ variant = 'default', children, ...props }) => {
  const getButtonClasses = (variant: ButtonVariant) => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 text-white border border-blue-500';
      case 'secondary':
        return 'bg-gray-500 text-white border border-gray-500';
      case 'success':
        return 'bg-green-500 text-white border border-green-500';
      case 'danger':
        return 'bg-red-500 text-white border border-red-500';
      case 'outline':
        return 'bg-transparent text-blue-500 border border-blue-500';
      default:
        return 'bg-white text-black border border-gray-300';
    }
  };

  const buttonClasses = `px-4 py-2 rounded ${getButtonClasses(variant)}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
