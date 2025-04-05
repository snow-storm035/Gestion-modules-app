// AddModuleForm.js
import  { useState } from 'react';
import "../style/ajouterprfseur.css"
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
  import { useDarkMode } from "../DarkModeProvider/DarkModeContext";



const AddformateurForm = () => {
    const { darkMode } = useDarkMode();

  const [formData, setFormData] = useState({
    code_formateur: '',
    nom_formateur: '',
  });

  const [excelFile, setExcelFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExcelChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const handleSubmitformateur = (e) => {
    e.preventDefault();
    console.log('formateur form data:', formData);
    // Add your module form submission logic here
  };

  const handleSubmitExcel = (e) => {
    e.preventDefault();
    console.log('Excel file:', excelFile?.name);
    // Add your Excel file submission logic here
  };

  return (
    <div className="add-formateur-container">
      {/* <Container fluid className="add-formateur-content"> */}
      <Container fluid className={darkMode ? "add-formateur-content":"add-formateur-content add-formateur-content-dark"}>
        <h1 className="mb-4">Ajouter formateur</h1>
        
        {/* First Form - formateur Data */}
        <Form onSubmit={handleSubmitformateur} className="formateur-form">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><strong>Code formateur</strong></Form.Label>
                <Form.Control
                  type="text"
                  name="code_formateur"
                  value={formData.code_formateur}
                  onChange={handleInputChange}
                  placeholder="Enter code formateur"
                />
              </Form.Group>
            </Col>
            {/* code_formateur: 'F018',
        nom_formateur: 'Wilson',
        created_at: '2023-01-24T09:30:00Z',
        updated_at: '2023-01-24T09:30:00Z' */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><strong>Nom formateur</strong></Form.Label>
                <Form.Control
                  type="text"
                  name="nom_formateur"
                  value={formData.nom_formateur}
                  onChange={handleInputChange}
                  placeholder="Enter formateur name"
                />
              </Form.Group>
            </Col>
          </Row>


          <div className="mt-4">
            <Button variant="primary" type="submit" className="full-width-btn">
              Ajouter formateur
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
              name='excelfile'
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

export default AddformateurForm;