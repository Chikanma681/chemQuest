// import React, { useState } from 'react';
// import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
// import { useNavigate } from 'react-router-dom';
// import './../css/Sim.css'; // Import the CSS file

// const Pipeline = () => {
//   const navigate = useNavigate();

//   const [diameter, setDiameter] = useState(0);
//   const [thickness, setThickness] = useState(0);
//   const [grade, setGrade] = useState('');
//   const [operatingPressure, setOperatingPressure] = useState(0);
//   const [jointFactor, setJointFactor] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validation checks for input ranges
//     if (
//       diameter < 200 ||
//       diameter > 400 ||
//       thickness < 3 ||
//       thickness > 10 ||
//       (grade < 340 || grade > 400) ||
//       operatingPressure < 5 ||
//       operatingPressure > 20 ||
//       !['Seamless', 'Electric Welded', 'Submerged arc welded', 'Continuous welded'].includes(jointFactor)
//     ) {
//       setErrorMsg('Please enter valid values within the specified ranges.');
//       return;
//     }

//     // Perform pipeline simulation or other actions using the entered values

//     // Redirect or perform other actions after submitting the form
//     navigate('/'); // Redirect to the main menu or another appropriate page
//   };

//   const dismissError = () => {
//     setErrorMsg('');
//   };

//   return (
//     <div className="batch-reactor-screen">
//       <h2>Pipeline Simulation</h2>
//       {errorMsg && <Alert color="danger" isOpen={errorMsg !== ''} toggle={dismissError}>{errorMsg}</Alert>}
//       <alert color="light" className='pipeline-alert'>
//           Note: Location Factor (LF) and Temperature Factor (TF) are assumed to be 1.0.
//         </alert>
//       <Form onSubmit={handleSubmit}>
//         <FormGroup>
//           <Label for="diameter">Diameter:</Label>
//           <Input
//             type="number"
//             id="diameter"
//             value={diameter}
//             onChange={(e) => setDiameter(parseFloat(e.target.value))}
//             placeholder="Enter diameter"
//             required
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="thickness">Thickness:</Label>
//           <Input
//             type="number"
//             id="thickness"
//             value={thickness}
//             onChange={(e) => setThickness(parseFloat(e.target.value))}
//             placeholder="Enter thickness"
//             required
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="grade">Grade:</Label>
//           <Input
//             type="number"
//             id="grade"
//             value={grade}
//             onChange={(e) => setGrade(parseFloat(e.target.value))}
//             placeholder="Enter grade"
//             required
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="operatingPressure">Operating Pressure:</Label>
//           <Input
//             type="number"
//             id="operatingPressure"
//             value={operatingPressure}
//             onChange={(e) => setOperatingPressure(parseFloat(e.target.value))}
//             placeholder="Enter operating pressure"
//             required
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="jointFactor">Joint Factor:</Label>
//           <Input
//             type="select"
//             id="jointFactor"
//             value={jointFactor}
//             onChange={(e) => setJointFactor(e.target.value)}
//             required
//           >
//             <option value="">Select Joint Factor</option>
//             <option value="Seamless">Seamless (1.00)</option>
//             <option value="Electric Welded">Electric Welded (1.00)</option>
//             <option value="Submerged arc welded">Submerged arc welded (1.00)</option>
//             <option value="Continuous welded">Continuous welded (0.60)</option>
//           </Input>
//         </FormGroup>

//         <button type="submit" className="btn-submit">
//           Simulate
//         </button>
//       </Form>
//     </div>
//   );
// };

// export default Pipeline;

import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert, Tooltip } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './../css/Sim.css'; // Import the CSS file

const Pipeline = () => {
  const navigate = useNavigate();

  const [diameter, setDiameter] = useState(0);
  const [thickness, setThickness] = useState(0);
  const [grade, setGrade] = useState('');
  const [operatingPressure, setOperatingPressure] = useState(0);
  const [jointFactor, setJointFactor] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks for input ranges

    // ...

    // Redirect or perform other actions after submitting the form
    navigate('/'); // Redirect to the main menu or another appropriate page
  };

  const dismissError = () => {
    setErrorMsg('');
  };

  const tooltipMessages = {
    diameter: 'Diameter range: 200 to 400',
    thickness: 'Thickness range: 3 to 10',
    grade: 'Grade range: 340 to 400',
    operatingPressure: 'Operating Pressure range: 5 to 20',
    jointFactor: 'Joint Factor options: Seamless, Electric Welded, Submerged arc welded, Continuous welded'
  };

  const [tooltipsOpen, setTooltipsOpen] = useState({
    diameter: false,
    thickness: false,
    grade: false,
    operatingPressure: false,
    jointFactor: false
  });

  const toggleTooltip = (field) => {
    setTooltipsOpen({ ...tooltipsOpen, [field]: !tooltipsOpen[field] });
  };

  return (
    <div className="batch-reactor-screen">
      <h2>Pipeline Simulation</h2>
      {errorMsg && <Alert color="danger" isOpen={errorMsg !== ''} toggle={dismissError}>{errorMsg}</Alert>}
      <alert color="light" className='pipeline-alert'>
        Note: Location Factor (LF) and Temperature Factor (TF) are assumed to be 1.0.
      </alert>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="diameter">Diameter:</Label>
          <Input
            type="number"
            id="diameter"
            value={diameter}
            onChange={(e) => setDiameter(parseFloat(e.target.value))}
            placeholder="Enter diameter"
            required
            onMouseOver={() => toggleTooltip('diameter')}
            onMouseLeave={() => toggleTooltip('diameter')}
          />
          <Tooltip
            placement="top"
            isOpen={tooltipsOpen['diameter']}
            target="diameter"
            toggle={() => toggleTooltip('diameter')}
          >
            {tooltipMessages['diameter']}
          </Tooltip>
        </FormGroup>
        <FormGroup>
          <Label for="thickness">Thickness:</Label>
          <Input
            type="number"
            id="thickness"
            value={thickness}
            onChange={(e) => setThickness(parseFloat(e.target.value))}
            placeholder="Enter thickness"
            required
            onMouseOver={() => toggleTooltip('thickness')}
            onMouseLeave={() => toggleTooltip('thickness')}
          />
          <Tooltip
            placement="top"
            isOpen={tooltipsOpen['thickness']}
            target="thickness"
            toggle={() => toggleTooltip('thickness')}
          >
            {tooltipMessages['thickness']}
          </Tooltip>
        </FormGroup>
        <FormGroup>
          <Label for="grade">Grade:</Label>
          <Input
            type="number"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(parseFloat(e.target.value))}
            placeholder="Enter grade"
            required
            onMouseOver={() => toggleTooltip('grade')}
            onMouseLeave={() => toggleTooltip('grade')}
          />
          <Tooltip
            placement="top"
            isOpen={tooltipsOpen['grade']}
            target="grade"
            toggle={() => toggleTooltip('grade')}
          >
            {tooltipMessages['grade']}
          </Tooltip>
        </FormGroup>
        <FormGroup>
          <Label for="operatingPressure">Operating Pressure:</Label>
          <Input
            type="number"
            id="operatingPressure"
            value={operatingPressure}
            onChange={(e) => setOperatingPressure(parseFloat(e.target.value))}
            placeholder="Enter operating pressure"
            required
            onMouseOver={() => toggleTooltip('operatingPressure')}
            onMouseLeave={() => toggleTooltip('operatingPressure')}
          />
          <Tooltip
            placement="top"
            isOpen={tooltipsOpen['operatingPressure']}
            target="operatingPressure"
            toggle={() => toggleTooltip('operatingPressure')}
          >
            {tooltipMessages['operatingPressure']}
          </Tooltip>
        </FormGroup>
        <FormGroup>
          <Label for="jointFactor">Joint Factor:</Label>
          <Input
            type="select"
            id="jointFactor"
            value={jointFactor}
            onChange={(e) => setJointFactor(e.target.value)}
            required
            onMouseOver={() => toggleTooltip('jointFactor')}
            onMouseLeave={() => toggleTooltip('jointFactor')}
          >
            <option value="">Select Joint Factor</option>
            <option value="Seamless">Seamless (1.00)</option>
            <option value="Electric Welded">Electric Welded (1.00)</option>
            <option value="Submerged arc welded">Submerged arc welded (1.00)</option>
            <option value="Continuous welded">Continuous welded (0.60)</option>
          </Input>
          <Tooltip
            placement="top"
            isOpen={tooltipsOpen['jointFactor']}
            target="jointFactor"
            toggle={() => toggleTooltip('jointFactor')}
          >
            {tooltipMessages['jointFactor']}
          </Tooltip>
        </FormGroup>

        <button type="submit" className="btn-submit">
          Simulate
        </button>
     </Form>
    </div>
  );
};


export default Pipeline