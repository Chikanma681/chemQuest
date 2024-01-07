import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './../css/Sim.css'; // Import the CSS file

const HeatExchanger = () => {
  const navigate = useNavigate();

  const [foulingFactor, setFoulingFactor] = useState(0);
  const [foulingFluid, setFoulingFluid] = useState("");  //use Fouling Fluid to send API Request

  const [area, setArea] = useState(0);
  const [heatCoefficient, setHeatCoefficient] = useState(0);
  const [Thi, setThi] = useState(0);
  const [Tho, setTho] = useState(0);
  const [Tci, setTci] = useState(0);
  const [Tco, setTco] = useState(0);

  const fluidFoulingData = {
    "Ammonia vapor": "0.0001763",
    "Engine exhaust gas": "0.001763",
    "Engine Lube Oil": "0.0001763",
    "Fuel Oil #2": "0.0003526",
    "Fuel Oil #6": "0.0008815",
    "Natural Gas": "0.0001763",
    "Nitrogen": "8.815E-05",
    "Refrigerant Vapors": "0.0003526",
    "Steam": "8.815E-05",
    "Transformer Oil": "0.0001763"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform calculations or other actions using the entered values

    // Redirect or perform other actions after submitting the form
    navigate('/'); // Redirect to the main menu or another appropriate page
  };


  const handleFluidChange = (e) => {
    setFoulingFluid(e.target.value);
 
  };

  console.log(foulingFluid)

  return (
    <div className="batch-reactor-screen" style={{width:'100%'}}> {/* Apply the heat-exchanger-screen class */}
      <h2>Heat Exchanger Simulation</h2>
      <Form onSubmit={handleSubmit}  style={{ width: '100%', margin: '0 auto' }}>
        <Row>
          <Col lg={6}>
          <FormGroup>
          <Label for="fluidSelect">Select Fluid:</Label>
          <Input
            type="select"
            id="fluidSelect"
            value={foulingFluid}
            onChange={handleFluidChange}
            required
          >
            <option value="">Select a Fluid</option>
            {Object.entries(fluidFoulingData).map(([fluid, foulingFactor]) => (
              <option key={fluid} value={foulingFactor}>
                {fluid}
              </option>
            ))}
          </Input>
        </FormGroup>
            <FormGroup className="form-group"> {/* Apply the form-group class */}
              <Label for="area">Area (A):</Label>
              <Input
                type="number"
                id="area"
                value={area}
                onChange={(e) => setArea(parseFloat(e.target.value))}
                placeholder="Enter area (A)"
                required
              />
            </FormGroup>
            <FormGroup className="form-group"> {/* Apply the form-group class */}
              <Label for="heatCoefficient">Heat Coefficient (U):</Label>
              <Input
                type="number"
                id="heatCoefficient"
                value={heatCoefficient}
                onChange={(e) => setHeatCoefficient(parseFloat(e.target.value))}
                placeholder="Enter heat coefficient (U)"
                required
              />
            </FormGroup>
            <FormGroup className="form-group"> {/* Apply the form-group class */}
              <Label for="Thi">Hot temperature (in):</Label>
              <Input
                type="number"
                id="Thi"
                value={Thi}
                onChange={(e) => setThi(parseFloat(e.target.value))}
                placeholder="Enter Thi"
                required
              />
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup className="form-group"> {/* Apply the form-group class */}
              <Label for="Tho">Hot temperature (out):</Label>
              <Input
                type="number"
                id="Tho"
                value={Tho}
                onChange={(e) => setTho(parseFloat(e.target.value))}
                placeholder="Enter Tho"
                required
              />
            </FormGroup>
            <FormGroup className="form-group"> {/* Apply the form-group class */}
              <Label for="Tci">Cold temperature (in):</Label>
              <Input
                type="number"
                id="Tci"
                value={Tci}
                onChange={(e) => setTci(parseFloat(e.target.value))}
                placeholder="Enter Tci"
                required
              />
            </FormGroup>
            <FormGroup className="form-group"> {/* Apply the form-group class */}
              <Label for="Tco">Cold temperature (out):</Label>
              <Input
                type="number"
                id="Tco"
                value={Tco}
                onChange={(e) => setTco(parseFloat(e.target.value))}
                placeholder="Enter Tco"
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <button type="submit" className="btn-submit">Simulate</button> {/* Apply the btn-submit class */}
      </Form>
    </div>
  );
};

export default HeatExchanger;

