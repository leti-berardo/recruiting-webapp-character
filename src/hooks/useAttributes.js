import { useState } from "react";

const useAttributes = () => {
  const [attributes, setAttributes] = useState({
    strength: 10,
    dexterity: 5,
    constitution: 2,
    intelligence: 4,
    wisdom: 0,
    charisma: 0,
  });

  const increaseAttribute = (attributeName) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attributeName.toLowerCase()]:
        prevAttributes[attributeName.toLowerCase()] + 1,
    }));
  };

  const decreaseAttribute = (attributeName) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attributeName.toLowerCase()]:
        prevAttributes[attributeName.toLowerCase()] - 1,
    }));
  };

  const getAttributeValue = (attributeName) => {
    return attributes[attributeName.toLowerCase()];
  };

  return {
    attributes,
    increaseAttribute,
    decreaseAttribute,
    getAttributeValue,
  };
};

export default useAttributes;
