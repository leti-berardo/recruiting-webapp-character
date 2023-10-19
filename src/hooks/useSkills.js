import { SKILL_LIST } from "../consts";
import { useEffect, useState } from "react";

const useSkills = (attributes) => {
  const [skills, setSkills] = useState(SKILL_LIST);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) => {
        return {
          ...skill,
          value: 0,
          total: skill.value
            ? attributes[skill.attributeModifier.toLowerCase()] + skill.value
            : 0,
        };
      })
    );
  }, []);

  useEffect(() => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) => {
        return {
          ...skill,
          value: skill.value ? skill.value : 0,
          total: skill.value
            ? attributes[skill.attributeModifier.toLowerCase()] + skill.value
            : 0,
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
                newValue > 0
                  ? attributes[skill.attributeModifier.toLowerCase()] + newValue
                  : newValue,
            }
          : skill
      )
    );
  };

  return { skills, totalValue, updateSkill };
};

export default useSkills;
