type hoverAnimationType = {
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  shadow?: string;
  children?: JSX.Element;
};

const HoverAnimation = ({
  bgColor,
  textColor,
  borderColor,
  shadow,
  children,
}: hoverAnimationType) => {
  return (
    <div
      className={`flex items-center justify-center p-2 rounded-md ${bgColor} ${textColor} ${borderColor} hover:${shadow} hover:translate-x-[-5px] hover:translate-y-[-5px] transition-all ease-in-out`}
    >
      {children}
    </div>
  );
};

export default HoverAnimation;
