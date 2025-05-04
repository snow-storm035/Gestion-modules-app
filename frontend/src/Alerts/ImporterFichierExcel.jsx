
// import "./ImporterFichierExcel.css";
import "../style/ImporterFichierExcel.css";
import excelIcon from "../image/excel.png";
import { useState } from "react";
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
// import {storeAvancement} from "../Axios/apiService/storeAvancement"
import uploadStats from '../Axios/apiService';
import apiService from "../Axios/apiService";

export default function ImporterFichierExcel() {
  const { darkMode } = useDarkMode();
  const [excelFile, setExcelFile] = useState(null);

  const handleSubmitExcel = async (e) => {
    e.preventDefault();

    if (!excelFile) {
      alert("Veuillez sélectionner un fichier Excel.");
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      const result = await apiService.uploadStats(formData);
      console.log("Réponse du serveur :", result);
      alert("Fichier importé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'import :", error);
      alert("Une erreur est survenue lors de l'import.");
    }
  };

  const handleExcelChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  return (
    <div
      className={
        darkMode
          ? "container-import-file-excel"
          : "container-import-file-excel container-import-file-excel-dark-mode"
      }
    >
      <h1>Importer fichier Excel :</h1>
      <div className="form-choisir-fichier">
        <img src={excelIcon} alt="Excel Icon" className="file-excel" />
        <form onSubmit={handleSubmitExcel}>
          <input
            type="file"
            placeholder="choisir un fichier"
            accept=".xlsx,.xls,.csv"
            onChange={handleExcelChange}
            className="file-input"
          />

          <input
            type="submit"
            value="Valider"
            className="submit-btn"
          />
        </form>
      </div>
    </div>
  );
}
