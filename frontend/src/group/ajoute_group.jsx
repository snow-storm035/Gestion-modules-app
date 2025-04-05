// AddGroupForm.js
import { useState } from 'react';
import "../style/AddGroupForm.css"
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";



const AddGroupForm = () => {
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
        code_groupe: '',
        niveau: '',
        effectif: '',
        annee_formation: '',
        creneau: ''
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
        console.log('group form data:', formData);
        // Add your module form submission logic here
    };

    const handleSubmitExcel = (e) => {
        e.preventDefault();
        console.log('Excel file:', excelFile?.name);
        // Add your Excel file submission logic here
    };

    return (
        <div className="add-group-container">
            {/* <Container fluid className="add-Group-content"> */}
            <Container fluid className={darkMode ? "add-group-content" : "add-group-content add-group-content-dark"}>
                <h1 className="mb-4">Ajouter group</h1>

                {/* First Form - group Data */}
                <Form onSubmit={handleSubmitGroup} className="group-form">
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
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label><strong>Code Groupe</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="code_groupe"
                                    value={formData.code_groupe}
                                    onChange={handleInputChange}
                                    placeholder="Enter code groupe"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label><strong>Niveau</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="niveau"
                                    value={formData.niveau}
                                    onChange={handleInputChange}
                                    placeholder="Enter niveau"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label><strong>Effectif</strong></Form.Label>
                                <Form.Control
                                    type="number"
                                    name="effectif"
                                    value={formData.effectif}
                                    onChange={handleInputChange}
                                    placeholder="Enter effectif"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label><strong>Année Formation</strong></Form.Label>
                                <Form.Control
                                    type="number"  // Changed from "text" to "number"
                                    name="annee_formation"
                                    value={formData.annee_formation}
                                    onChange={handleInputChange}
                                    placeholder="Ex: 2024"
                                    min="2000"  // Optional: Set a minimum reasonable year
                                    max="2100"  // Optional: Set a maximum reasonable year
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-4">
                                <Form.Label><strong>Creneau</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="creneau"
                                    value={formData.creneau}
                                    onChange={handleInputChange}
                                    placeholder="Enter creneau"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="mt-4">
                        <Button variant="primary" type="submit" className="full-width-btn">
                            Ajouter Group
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

export default AddGroupForm;