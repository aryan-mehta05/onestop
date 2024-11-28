interface LargeTextProps {
  text: string;
  className?: string;
};

const LargeText = ({
  text,
  className,
}: LargeTextProps) => {
  return (
    <h3 className={`text-7xl font-playfair font-bold ${className}`}>
      {text}
    </h3>
  );
};

export default LargeText;
