// AddModuleForm.js
import { useState } from 'react';
import "../style/AddModuleForm.css"
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";



const AddModuleForm = () => {
  const { darkMode } = useDarkMode();

  const [formData, setFormData] = useState({
    code_module: '',
    nom_module: '',
    mh_presentiel: '',
    mh_distance: '',
    total_horaire: '',
    regionale: 'OUI',
    date_efm_normal: '',
    date_efm_rattrapage: ''
  });

  const [excelFile, setExcelFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExcelChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const handleSubmitModule = (e) => {
    e.preventDefault();
    console.log('Module form data:', formData);
    // Add your module form submission logic here
  };

  const handleSubmitExcel = (e) => {
    e.preventDefault();
    console.log('Excel file:', excelFile?.name);
    // Add your Excel file submission logic here
  };

  return (
    <div className="add-module-container">
      {/* <Container fluid className="add-module-content"> */}
      <Container fluid className={darkMode ? "add-module-content" : "add-module-content add-module-content-dark"}>
        <h1 className="mb-4">Ajouter module</h1>

        {/* First Form - Module Data */}
        <Form onSubmit={handleSubmitModule} className="module-form">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><strong>Code module</strong></Form.Label>
                <Form.Control
                  type="text"
                  name="code_module"
                  value={formData.code_module}
                  onChange={handleInputChange}
                  placeholder="Enter code module"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><strong>Nom Module</strong></Form.Label>
                <Form.Control
                  type="text"
                  name="nom_module"
                  value={formData.nom_module}
                  onChange={handleInputChange}
                  placeholder="Enter module name"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><strong>Masse horaire présentiel</strong></Form.Label>
                <Form.Control
                  type="number"
                  name="mh_presentiel"
                  value={formData.mh_presentiel}
                  onChange={handleInputChange}
                  placeholder="Enter hours"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><strong>Masse horaire distanciel</strong></Form.Label>
                <Form.Control
                  type="number"
                  name="mh_distance"
                  value={formData.mh_distance}
                  onChange={handleInputChange}
                  placeholder="Enter hours"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><strong>Total horaire distanciel</strong></Form.Label>
                <Form.Control
                  type="number"
                  name="total_horaire"
                  value={formData.total_horaire}
                  onChange={handleInputChange}
                  placeholder="Enter total hours"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label><strong>Régional</strong></Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="OUI"
                    name="regionale"
                    id="regionale-oui"
                    value="OUI"
                    checked={formData.regionale === 'OUI'}
                    onChange={handleInputChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="NON"
                    name="regionale"
                    id="regionale-non"
                    value="NON"
                    checked={formData.regionale === 'NON'}
                    onChange={handleInputChange}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date EFM Normal</Form.Label>
                <Form.Control
                  type="date"
                  name="date_efm_normal"
                  value={formData.date_efm_normal || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date EFM Rattrapage</Form.Label>
                <Form.Control
                  type="date"
                  name="date_efm_rattrapage"
                  value={formData.date_efm_rattrapage || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-4">
            <Button variant="primary" type="submit" className="full-width-btn">
              Ajouter Module
            </Button>
          </div>
        </Form>
        <hr />
        {/* Second Form - Excel File Only */}
        <Form onSubmit={handleSubmitExcel} className="excel-form">
          {/* <button type="button" className="submit-heading" disabled>
            Submit
          </button> */}

          <Form.Group className="mb-4">
            <Form.Label><strong>Select Excel file:</strong></Form.Label>
            <Form.Control
              type="file"
              accept=".xlsx, .xls"
              onChange={handleExcelChange}
              className="mb-2"
            />
            <span className="file-info">
              {excelFile ? excelFile.name : 'No file chosen'}
            </span>
          </Form.Group>

          <div className="mt-3">
            <Button variant="success" type="submit" className="full-width-btn">
              Upload Excel
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default AddModuleForm;