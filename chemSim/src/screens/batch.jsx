import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './../css/Sim.css'; // Import the CSS file

const BatchReactor = () => {
    // add a+b -> C and pciture of a batch reactor
  const navigate = useNavigate();

  const [calcType, setCalcType] = useState('');
  const [initialConcCa, setInitialConcCa] = useState(0);
  const [initialConcCb, setInitialConcCb] = useState(0);
  const [initialConcCc, setInitialConcCc] = useState(0);
  const [reactionRate, setReactionRate] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [desiredTime, setDesiredTime] = useState(0);
  const [simulationResult, setSimulationResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data payload
    const data = {
      calcType: 'calculate',
      initialConcCa,
      initialConcCb,
      initialConcCc,
      reactionRate,
      desiredTime,
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
  return (
    <div className="batch-reactor-screen"> {/* Apply the batch-reactor-screen class */}
      <h2>Batch Reactor Simulation</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="form-group"> {/* Apply the form-group class */}
          <Label for="initialConcCa">Initial Concentration Ca:</Label>
          <Input
            type="number"
            id="initialConcCa"
            value={initialConcCa}
            onChange={(e) => setInitialConcCa(parseFloat(e.target.value))}
            placeholder="Enter initial concentration Ca"
            required
          />
        </FormGroup>
        <FormGroup className="form-group"> {/* Apply the form-group class */}
          <Label for="initialConcCb">Initial Concentration Cb:</Label>
          <Input
            type="number"
            id="initialConcCb"
            value={initialConcCb}
            onChange={(e) => setInitialConcCb(parseFloat(e.target.value))}
            placeholder="Enter initial concentration Cb"
            required
          />
        </FormGroup>
        <FormGroup className="form-group"> {/* Apply the form-group class */}
          <Label for="initialConcCc">Initial Concentration Cc:</Label>
          <Input
            type="number"
            id="initialConcCc"
            value={initialConcCc}
            onChange={(e) => setInitialConcCc(parseFloat(e.target.value))}
            placeholder="Enter initial concentration Cc"
            required
          />
        </FormGroup>
        <FormGroup className="form-group"> {/* Apply the form-group class */}
          <Label for="reactionRate">Reaction Rate (k1):</Label>
          <Input
            type="number"
            id="reactionRate"
            value={reactionRate}
            onChange={(e) => setReactionRate(parseFloat(e.target.value))}
            placeholder="Enter reaction rate (k1)"
            required
          />
        </FormGroup>
        {/* t_end is still required but is the same as desired time */}
        <FormGroup className="form-group"> {/* Apply the form-group class */}
          <Label for="desiredTime">Desired Time (mins):</Label>
          <Input
            type="number"
            id="desiredTime"
            value={desiredTime}
            onChange={(e) => setDesiredTime(parseFloat(e.target.value))}
            placeholder="Enter desired time"
            required
          />
        </FormGroup>
        <button type="submit" className="btn-submit" ><strong>Simulate</strong></button> {/* Apply the btn-submit class */}
      </Form>
         {/* Simulation results display */}
  { /* Simulation results display */}


{simulationResult && (
  <div className="simulation-results" style={{ margin: '20px' }}>
    <h3>Batch Reactor Simulation Results</h3>
    <div className="result-summary">
      <p className="conversion">Conversion of A: {simulationResult.conversion.toFixed(4)}</p>
      <p className="time">Concentrations at time {desiredTime}:</p>
      <ul className="concentration-list">
        <li>Ca: {simulationResult.concentrations_at_time[0].toFixed(4)}</li>
        <li>Cb: {simulationResult.concentrations_at_time[1].toFixed(4)}</li>
        <li>Cc: {simulationResult.concentrations_at_time[2].toFixed(4)}</li>
      </ul>
    </div>
    <div className="chart-container">
      <img className="simulation-chart" src={simulationResult.image_url} alt="Simulation Chart" />
    </div>
  </div>
)}</div>)}


export default BatchReactor;
