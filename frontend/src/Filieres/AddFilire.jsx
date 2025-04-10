// AddGroupForm.js
import { useState } from 'react';
import "../style/AddFilire.css"
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";



const AddFiliereForm = () => {
    const { darkMode } = useDarkMode();


    // code_filiere: 'PHYS101',
    // code_groupe: 'G600A',
    // niveau: '1ère année',
    // effectif: 23,
    // annee_formation: 2023,
    // status_groupe: 'active',
    // mode: 'présentiel',
    // creneau: '11:00-13:00',

    const [formData, setFormData] = useState({
        code_filiere: '',
        nom_filiere: '',
        type_formation: '',
        secteur: ''
      });
    

    const [excelFile, setExcelFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleExcelChange = (e) => {
        setExcelFile(e.target.files[0]);
    };

    const handleSubmitGroup = (e) => {
        e.preventDefault();
        console.log('Filiere form data:', formData);
        // Add your module form submission logic here
    };

    const handleSubmitExcel = (e) => {
        e.preventDefault();
        console.log('Excel file:', excelFile?.name);
        // Add your Excel file submission logic here
    };

    return (
        <div className="add-filiere-container">
            {/* <Container fluid className="add-Group-content"> */}
            <Container fluid className={darkMode ? "add-filiere-content" : "add-filiere-content add-filiere-content-dark"}>
                <h1 className="mb-4">Ajouter filiére</h1>

                {/* First Form - group Data */}
                <Form onSubmit={handleSubmitGroup} className="filiere-form">
                <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Code Filiere</strong></Form.Label>
            <Form.Control
              type="text"
              name="code_filiere"
              value={formData.code_filiere}
              onChange={handleInputChange}
              placeholder="Enter code filiere"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Nom Filiere</strong></Form.Label>
            <Form.Control
              type="text"
              name="nom_filiere"
              value={formData.nom_filiere}
              onChange={handleInputChange}
              placeholder="Enter nom filiere"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Type Formation</strong></Form.Label>
            <Form.Control
              as="select"
              name="type_formation"
              value={formData.type_formation}
              onChange={handleInputChange}
              required
            >
              <option value="">Select type</option>
              <option value="Initiale">Initiale</option>
              <option value="Continue">Continue</option>
              <option value="Alternance">Alternance</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Secteur</strong></Form.Label>
            <Form.Control
              as="select"
              name="secteur"
              value={formData.secteur}
              onChange={handleInputChange}
              required
            >
              <option value="">Select secteur</option>
              <option value="Technologie">Technologie</option>
              <option value="Industrie">Industrie</option>
              <option value="Santé">Santé</option>
              <option value="Commerce">Commerce</option>
              <option value="Management">Management</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
                    <div className="mt-4">
                        <Button variant="primary" type="submit" className="full-width-btn">
                            Ajouter Filiere
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

export default AddFiliereForm;