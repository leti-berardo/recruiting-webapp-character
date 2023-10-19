import { useEffect, useState } from "react";

const useSkills = (attributes) => {
  const [skills, setSkills] = useState([
    { name: "Acrobatics", attributeModifier: "Dexterity", value: 0, total: 0 },
    {
      name: "Animal Handling",
      attributeModifier: "Wisdom",
      value: 0,
      total: 0,
    },
    { name: "Arcana", attributeModifier: "Intelligence", value: 0, total: 0 },
    { name: "Athletics", attributeModifier: "Strength", value: 0, total: 0 },
    { name: "Deception", attributeModifier: "Charisma", value: 0, total: 0 },
    { name: "History", attributeModifier: "Intelligence", value: 0, total: 0 },
    { name: "Insight", attributeModifier: "Wisdom", value: 0, total: 0 },
    { name: "Intimidation", attributeModifier: "Charisma", value: 0, total: 0 },
    {
      name: "Investigation",
      attributeModifier: "Intelligence",
      value: 0,
      total: 0,
    },
    { name: "Medicine", attributeModifier: "Wisdom", value: 0, total: 0 },
    { name: "Nature", attributeModifier: "Intelligence", value: 0, total: 0 },
    { name: "Perception", attributeModifier: "Wisdom", value: 0, total: 0 },
    { name: "Performance", attributeModifier: "Charisma", value: 0, total: 0 },
    { name: "Persuasion", attributeModifier: "Charisma", value: 0, total: 0 },
    { name: "Religion", attributeModifier: "Intelligence", value: 0, total: 0 },
    {
      name: "Sleight of Hand",
      attributeModifier: "Dexterity",
      value: 0,
      total: 0,
    },
    { name: "Stealth", attributeModifier: "Dexterity", value: 0, total: 0 },
    { name: "Survival", attributeModifier: "Wisdom", value: 0, total: 0 },
  ]);

  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) => {
        return {
          ...skill,
          total:
            attributes[skill.attributeModifier.toLowerCase()] + skill.value,
        };
      })
    );
  }, [attributes]);

  useEffect(() => {
    setTotalValue(
      skills.reduce((accumulator, skill) => {
        return accumulator + skill.value;
      }, 0)
    );
  }, [skills]);

  const updateSkill = (name, newValue) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.name === name && newValue >= 0
          ? {
              ...skill,
              value: newValue,
              total:
                attributes[skill.attributeModifier.toLowerCase()] + newValue,
            }
          : skill
      )
    );
  };

  return { skills, totalValue, updateSkill };
};

export default useSkills;
