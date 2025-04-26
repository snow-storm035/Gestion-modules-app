// import "./ImporterFichierExcel.css";
import "../style/ImporterFichierExcel.css"
import excelIcon from "../image/excel.png"; // Correct import for the image
import { useState } from "react";
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
export default function ImporterFichierExcel() {
  const {darkMode}=useDarkMode();
     const [excelFile, setExcelFile] = useState(null);
  const handleSubmitExcel = (e) => {
    e.preventDefault();
    console.log('Excel file:', excelFile?.name);
    // Add your Excel file submission logic here
};
const handleExcelChange = (e) => {
    setExcelFile(e.target.files[0]);
};
  return (
    <div className={darkMode?"container-import-file-excel":"container-import-file-excel container-import-file-excel-dark-mode"}>
      <h1>Importer fichier Excel :</h1>
      <div className="form-choisir-fichier">
        <img src={excelIcon} alt="Excel Icon" className="file-excel" />
        <form action="">
          <input
            type="file"
            placeholder="choisir un fichier"
            accept=".xlsx,.xls,.csv"
            onChange={handleExcelChange}
            className="file-input"
          />

          <input onClick={handleSubmitExcel} type="submit" value="Valider" className="submit-btn" />
        </form>
      </div>
    </div>
  );
}

// 
// className="mb-2"
// />
