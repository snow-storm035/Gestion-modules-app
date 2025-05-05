import { useEffect, useState } from "react";
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
import excelIcon from "../image/excel.png";
import apiService from "../Axios/apiService";
import "../style/ImporterFichierExcel.css"
export default function ImporterFichierExcel() {
  const { darkMode } = useDarkMode();
  const [excelFile, setExcelFile] = useState(null);
  const [typeImport, setTypeImport] = useState("dates_modules"); // valeur par défaut

  const handleSubmitExcel = async (e) => {
    e.preventDefault();
console.log("excelFile:",excelFile)
console.log("excelFile:",typeImport)
    if (!excelFile) {
      alert("Veuillez sélectionner un fichier Excel.");
      return;
    }

    // const formData = new FormData();
    // formData.append("file", excelFile);
    // formData.append("type", typeImport); // envoyer le type

    try {
      await apiService.getCsrfCookie()
      console.log("excelFile:",excelFile)
      console.log("typeImport:",typeImport)
      const result = await apiService.uploadStats(excelFile,typeImport);
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
        <form onSubmit={handleSubmitExcel} encType="">
          <input
            type="file"
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
