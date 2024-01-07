import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './../css/Sim.css'; // Import the CSS file

const BatchReactor = () => {
  const navigate = useNavigate();

  const [calcType, setCalcType] = useState('');
  const [initialConcCa, setInitialConcCa] = useState(0);
  const [initialConcCb, setInitialConcCb] = useState(0);
  const [initialConcCc, setInitialConcCc] = useState(0);
  const [reactionRate, setReactionRate] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [desiredTime, setDesiredTime] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform simulation or other actions using the entered values

    // Redirect or perform other actions after submitting the form
    navigate('/'); // Redirect to the main menu or another appropriate page
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
          <Label for="desiredTime">Desired Time:</Label>
          <Input
            type="number"
            id="desiredTime"
            value={desiredTime}
            onChange={(e) => setDesiredTime(parseFloat(e.target.value))}
            placeholder="Enter desired time"
            required
          />
        </FormGroup>
        <Button type="submit" className="btn-submit">Simulate</Button> {/* Apply the btn-submit class */}
      </Form>
    </div>
  );
};

export default BatchReactor;
