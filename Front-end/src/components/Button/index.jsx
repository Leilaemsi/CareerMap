import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[30px]",
};
const variants = {
  fill: {
    purple_400_01: "bg-purple-400_01 text-white-A700",
    purple_400: "bg-purple-400 text-white-A700",
    none: "none" ,
  },
};
const sizes = {
  sm: "h-[61px] px-[20px] text-[18px]",
  xs: "h-[58px] px-[35px] text-[15px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "xs",
  color = "purple_400",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer text-white-A700 ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["sm", "xs"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["purple_400_01", "purple_400"]),
};

export { Button };
