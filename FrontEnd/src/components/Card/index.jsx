import React from "react";
import { Text, Img } from "..";

export default function Column({
  image,
  personalityType,
  title,
  description,
  ...props
}) {
  return (
    <div {...props}>
      <Img src={image} alt="image" className="h-[200px] object-contain" />
      <Text as="p" className="mt-3.5 w-full text-center leading-[23px] tracking-[-0.50px]">
        <span className="text-gray-700">
          <>
            {personalityType}
            <br />
          </>
        </span>
        <span className="text-base text-gray-700 font-bold">{title}</span>
      </Text>
      <Text
        size="xs"
        as="p"
        className="mb-7 mt-[5px] w-[88%] text-center !font-anekgurmukhi leading-[23px] tracking-[-0.50px] !text-gray-700_01 md:w-full"
      >
        {description}
      </Text>
    </div>
  );
}