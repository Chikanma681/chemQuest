import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import "./../css/Menu.css";

const ProcessMenu = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const processes = [
    { id: "batch", name: "Batch Reactor" },
    { id: "hx", name: "Heat Exchanger" },
    { id: "pipe", name: "Pressure Design of Pipeline According to CSA Z662" },
    // Add more processes as needed
  ];

  const handleProcessClick = (processId) => {
    navigate(`/${processId}`);
  };

  const buttonStyle = {
    backgroundColor: "#1a1a1a",
    borderColor: "transparent",
    color: "#ffffff",
  };

  const hoveredButtonStyle = {
    ...buttonStyle,
    color: "#646cff",
  };

  return (
    <div className="process-menu">
      <div className="menu-content">
        <h2 style={{ color: "white" }}>Select a Chemical Process</h2>
        <ul>
          {processes.map((process) => (
            <li key={process.id} style={{ fontWeight: "500px" }}>
              <Button
                onClick={() => handleProcessClick(process.id)}
                style={hoveredButton === process.id ? hoveredButtonStyle : buttonStyle}
                onMouseEnter={() => setHoveredButton(process.id)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <strong>{process.name}</strong>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProcessMenu;
