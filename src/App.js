import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST } from "./consts.js";
import { useState, useEffect } from "react";
import useAttributes from "./hooks/useAttributes";
import useSkills from "./hooks/useSkills";

function App() {
  const {
    attributes,
    increaseAttribute,
    decreaseAttribute,
    getAttributeValue,
  } = useAttributes();
  const { skills, totalValue, updateSkill } = useSkills(attributes);

  const [classSelected, setClassSelected] = useState();
  const [skillsPoints, setSkillsPoints] = useState(10);

  useEffect(() => {
    setSkillsPoints(10 + 4 * attributes.intelligence);
  }, [attributes.intelligence]);

  const isClassRequirementsMet = (className) => {
    return ATTRIBUTE_LIST.find((attribute) => {
      return CLASS_LIST[className][attribute] > getAttributeValue(attribute);
    });
  };

  const areSkillsPointsAvailable = () => {
    return skillsPoints - totalValue > 0;
  };

  const calculateAbilityModifier = (attributeValue) => {
    return Math.floor((attributeValue - 10) / 2);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        {/* TODO:CREATE COMPONENT */}
        <div className="App-module">
          <h2>Attributes</h2>
          {ATTRIBUTE_LIST.map((attribute, index) => {
            return (
              <div key={index}>
                {attribute}:{getAttributeValue(attribute)}
                <span
                  style={{
                    marginLeft: "2px",
                    fontSize: "12px",
                  }}
                >
                  (Modifier:
                  {calculateAbilityModifier(getAttributeValue(attribute))})
                </span>
                <button onClick={() => increaseAttribute(attribute)}>+</button>
                <button onClick={() => decreaseAttribute(attribute)}>-</button>
              </div>
            );
          })}
        </div>
        {/* TODO:CREATE COMPONENT */}
        <div className="App-module">
          <h2>Classes</h2>
          {Object.keys(CLASS_LIST).map((classTypes, index) => {
            return (
              <div
                onClick={() => setClassSelected(classTypes)}
                key={index}
                style={{
                  cursor: "pointer",
                  color: isClassRequirementsMet(classTypes) ? "white" : "red",
                }}
              >
                {classTypes}
              </div>
            );
          })}
        </div>
        {/* TODO:CREATE COMPONENT */}
        {classSelected ? (
          <div
            className="App-module"
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              setClassSelected("");
            }}
          >
            <h2>{classSelected}</h2>
            {Object.keys(CLASS_LIST[classSelected]).map((attribute, index) => {
              return (
                <div key={index}>
                  {attribute} : {CLASS_LIST[classSelected][attribute]}
                </div>
              );
            })}
          </div>
        ) : null}
        {/* TODO:CREATE COMPONENT */}
        <div className="App-module">
          <h2>Skills</h2>
          <p style={{ paddingBottom: "10px" }}>
            Total skills points available:{skillsPoints - totalValue}
          </p>
          {skills.map((skill, index) => {
            return (
              <div key={index}>
                <span>
                  {skill.name} - Points:{skill.value}
                </span>
                <button
                  onClick={() => {
                    if (areSkillsPointsAvailable())
                      updateSkill(skill.name, skill.value + 1);
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    updateSkill(skill.name, skill.value - 1);
                  }}
                >
                  -
                </button>
                <span
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                >
                  (Modifier: {skill.attributeModifier}:
                  {calculateAbilityModifier(
                    attributes[skill.attributeModifier.toLowerCase()]
                  )}
                  )
                </span>
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Total: {skill.total}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
