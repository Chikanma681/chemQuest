// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Button } from "reactstrap";
// // import "./../css/Menu.css";

// // const ProcessMenu = () => {
// //   const [hoveredButton, setHoveredButton] = useState(null);
// //   const navigate = useNavigate();

// //   const processes = [
// //     { id: "batch", name: "Batch Reactor" },
// //     { id: "hx", name: "Heat Exchanger" },
// //     { id: "pipe", name: "Pressure Design of Pipeline According to CSA Z662" },
// //     // Add more processes as needed
// //   ];

// //   const handleProcessClick = (processId) => {
// //     navigate(`/${processId}`);
// //   };

// //   const buttonStyle = {
// //     backgroundColor: "#1a1a1a",
// //     borderColor: "transparent",
// //     color: "#ffffff",
// //   };

// //   const hoveredButtonStyle = {
// //     ...buttonStyle,
// //     color: "#646cff",
// //   };

// //   return (
// //     <div className="process-menu">
// //       <div className="menu-content">
// //         <h2 style={{ color: "white" }}>Select a Chemical Process</h2>
// //         <ul>
// //           {processes.map((process) => (
// //             <li key={process.id} style={{ fontWeight: "500px" }}>
// //               <Button
// //                 onClick={() => handleProcessClick(process.id)}
// //                 style={hoveredButton === process.id ? hoveredButtonStyle : buttonStyle}
// //                 onMouseEnter={() => setHoveredButton(process.id)}
// //                 onMouseLeave={() => setHoveredButton(null)}
// //               >
// //                 <strong>{process.name}</strong>
// //               </Button>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProcessMenu;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "reactstrap";
// import "./../css/Menu.css";

// const ProcessMenu = () => {
//   const [hoveredButton, setHoveredButton] = useState(null);
//   const navigate = useNavigate();

//   const processes = [
//     { id: "batch", name: "Batch Reactor" },
//     { id: "hx", name: "Heat Exchanger" },
//     { id: "pipe", name: "Pressure Design of Pipeline According to CSA Z662" },
//     // Add more processes as needed
//   ];

//   const handleProcessClick = (processId) => {
//     navigate(`/${processId}`);
//   };

//   const buttonStyle = {
//     backgroundColor: "#1a1a1a",
//     borderColor: "transparent",
//     color: "#ffffff",
//     transition: "background-color 0.3s, transform 0.3s",
//   };

//   const hoveredButtonStyle = {
//     ...buttonStyle,
//     color: "#646cff",
//     transform: "scale(1.05)",
//     backgroundColor: "#646cff", // Change background color on hover
//   };

//   return (
//     <div className="process-menu">
//       <div className="menu-content">
//         <h2 style={{ color: "white" }}>Select a Chemical Process</h2>
//         <ul>
//           {processes.map((process) => (
//             <li key={process.id} style={{ fontWeight: "500px" }}>
//               <Button
//                 onClick={() => handleProcessClick(process.id)}
//                 style={hoveredButton === process.id ? hoveredButtonStyle : buttonStyle}
//                 onMouseEnter={() => setHoveredButton(process.id)}
//                 onMouseLeave={() => setHoveredButton(null)}
//               >
//                 <strong>{process.name}</strong>
//               </Button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProcessMenu;

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
    transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
    boxShadow: hoveredButton ? "0px 0px 10px 0px rgba(100,108,255,0.75)" : "none",
    borderRadius: "8px", // Add rounded corners
    margin: "10px",
  };

  const headerStyle = {
    color: "white",
    textAlign: "center",
    fontSize: "3em",
    marginBottom: "20px",
    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
    marginTop: "50px", // Move h2 text higher up vertically
  };

  return (
    <div className="process-menu">
      <div className="menu-content" style={{marginTop:"50px"}}>
        <h2
          style={headerStyle}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          Select a Chemical Process
        </h2>
        <ul style={{ listStyle: "none", padding: "0", textAlign: "center" }}>
          {processes.map((process) => (
            <li key={process.id} style={{ marginBottom: "10px" }}>
              <Button
                onClick={() => handleProcessClick(process.id)}
                style={hoveredButton === process.id ? { ...buttonStyle, boxShadow: "none", backgroundColor: "#646cff" } : buttonStyle}
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
