import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert, Tooltip } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './../css/Sim.css'; // Import the CSS file
import axios from 'axios';
import { BlockMath } from 'react-katex';

const Pipeline = () => {
  const navigate = useNavigate();

  const [diameter, setDiameter] = useState(0);
  const [thickness, setThickness] = useState(0);
  const [grade, setGrade] = useState('');
  const [operatingPressure, setOperatingPressure] = useState(0);
  const [jointFactor, setJointFactor] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [simulationResult, setSimulationResult] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data payload
    const data = {
      calcType: 'pipe',
      diameter,
      thickness,
      grade,
      operatingPressure,
      jointFactor,
    };

    try {
      // Make an API request to your backend server
      const response = await axios.post('http://127.0.0.1:5000/run', data);
      setSimulationResult(response.data);
      // Handle the response if needed

      console.log('API Response:', response.data);

    } catch (error) {
      // Handle errors or display a message to the user
      console.error('API Error:', error);
    }
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
     {simulationResult && (
  <div className="simulation-results" style={{ margin: '20px' }}>
    <h3>Pipeline Design Standards</h3>
    <div className="result-summary">
    <strong style={{ maxWidth: '300px', wordWrap: 'break-word'}}>{(simulationResult[0])} which can be seen below: </strong>
      <strong style={{ maxWidth: '300px', wordWrap: 'break-word'}}><BlockMath>{(simulationResult[1]||'').slice(0,17)}</BlockMath></strong>
      <strong
  style={{
    maxWidth: '300px',
    wordWrap: 'break-word',
    color: simulationResult[2] === 'Pipe is Safe' ? 'green' : 'red',
  }}
>
  {simulationResult[2]}
</strong>
<br/>
<strong style={{ maxWidth: '300px', wordWrap: 'break-word' }}>
  {simulationResult[3].replace(/MPaMPaMPa/g, 'MPa')}
</strong>
    </div>
  </div>
)}</div>)}



export default Pipeline;