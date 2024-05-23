import React from "react";

const sizes = {
  s: "text-[50px] font-extrabold md:text-[46px] sm:text-[40px]",
  md: "text-[53px] font-extrabold md:text-[45px] sm:text-[39px]",
  xs: "text-[32px] font-bold md:text-3xl sm:text-[28px]",
};

const Heading = ({ children, className = "", size = "xs", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-gray-800 font-rubik ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
