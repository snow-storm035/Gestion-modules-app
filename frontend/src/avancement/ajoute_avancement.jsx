// AddModuleForm.js
import  { useState } from 'react';
import "../style/ajoute_avancement.css"
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
  import { useDarkMode } from "../DarkModeProvider/DarkModeContext";



const AddModuleFormateurGroupeForm = () => {
    const { darkMode } = useDarkMode();

    const [formData, setFormData] = useState({
        code_module: '',
        code_filiere: '',
        code_formateur: 'none',
        code_groupe: '',
        nbh_par_semaine_realisee:0,
        date_debut: null,
        date_fin: null,
        nbhp_realisee: 0,
        nbhsync_realisee: 0,
        nbh_total_realisee: 0,
        nbcc_realisee: 0,
        efm_realise: 'non'
      });

  const [excelFile, setExcelFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const handleExcelChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const handleSubmitModule = (e) => {
    e.preventDefault();
    console.log('avancement form data:', formData);
    // Add your module form submission logic here
  };

  const handleSubmitExcel = (e) => {
    e.preventDefault();
    console.log('Excel file:', excelFile?.name);
    // Add your Excel file submission logic here
  };

  return (
    <div className="add-avoncement-container">
      {/* <Container fluid className="add-avancement-content"> */}
      <Container fluid className={darkMode ? "add-avancement-content":"add-avancement-content add-avancement-content-dark"}>
        <h1 className="mb-4">Ajouter avancement</h1>
        
        {/* First Form - Module Data */}
        <Form onSubmit={handleSubmitModule} className="avancement-form">
        <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Code Module</strong></Form.Label>
            <Form.Control
              type="text"
              name="code_module"
              value={formData.code_module}
              onChange={handleInputChange}
              placeholder="Enter module code"
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Code Filière</strong></Form.Label>
            <Form.Control
              type="text"
              name="code_filiere"
              value={formData.code_filiere}
              onChange={handleInputChange}
              placeholder="Enter filiere code"
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Code Formateur</strong></Form.Label>
            <Form.Control
              type="text"
              name="code_formateur"
              value={formData.code_formateur}
              onChange={handleInputChange}
              placeholder="Enter formateur code"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Code Groupe</strong></Form.Label>
            <Form.Control
              type="text"
              name="code_groupe"
              value={formData.code_groupe}
              onChange={handleInputChange}
              placeholder="Enter groupe code"
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label><strong>NBH par semaine réalisée</strong></Form.Label>
            <Form.Control
              type="number"
            //   step="0.1"
              name="nbh_par_semaine_realisee"
              value={formData.nbh_par_semaine_realisee}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label><strong>EFM Réalisé</strong></Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="OUI"
                name="efm_realise"
                id="efm-oui"
                value="oui"
                checked={formData.efm_realise === 'oui'}
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                type="radio"
                label="NON"
                name="efm_realise"
                id="efm-non"
                value="non"
                checked={formData.efm_realise === 'non'}
                onChange={handleInputChange}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Date Début</strong></Form.Label>
            <Form.Control
              type="date"
              name="date_debut"
              value={formData.date_debut || ''}
              onChange={(e) => handleDateChange('date_debut', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Date Fin</strong></Form.Label>
            <Form.Control
              type="date"
              name="date_fin"
              value={formData.date_fin || ''}
              onChange={(e) => handleDateChange('date_fin', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label><strong>NBHP Réalisée</strong></Form.Label>
            <Form.Control
              type="number"
            //   step="0.1"
              name="nbhp_realisee"
              value={formData.nbhp_realisee}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label><strong>NBHSync Réalisée</strong></Form.Label>
            <Form.Control
              type="number"
            //   step="0.1"
              name="nbhsync_realisee"
              value={formData.nbhsync_realisee}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label><strong>NBH Total Réalisée</strong></Form.Label>
            <Form.Control
              type="number"
            //   step="0.1"
              name="nbh_total_realisee"
              value={formData.nbh_total_realisee}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label><strong>NBCC Réalisée</strong></Form.Label>
            <Form.Control
              type="number"
              name="nbcc_realisee"
              value={formData.nbcc_realisee}
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

export default AddModuleFormateurGroupeForm;