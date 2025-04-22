import { useState } from 'react';
import './CircularProgress.css';

const ProgressModules = () => {
  const [progressData] = useState([
    { id: 1, name: "filière 1", value: 9 },
    { id: 2, name: "filière 2", value: 40 },
    { id: 3, name: "filière 3", value: 55 }
  ]);

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="progress-container">
      {/* <h2 className="progress-title">Progrès des modules</h2> */}

      {progressData.map((filiere) => (
        <div key={filiere.id} className="progress-item">
          <div className="progress-header">
            <span>{filiere.name} :</span>
            <span>{filiere.value}%</span>
          </div>
          <svg className="progress-bar">
            <rect className="progress-bar-bg" width="100%" height="6" rx="5" ry="5" />
            <rect
              className={`progress-bar-fill ${filiere.value > 50 ? 'high' : 'low'}`}
              width={`${filiere.value}%`}
              height="6"
              rx="5"
              ry="5"
            />
          </svg>
        </div>
      ))}

      {/* Button at bottom-right inside progress-container */}
      <div className="button-container">
        <button className="details-button" onClick={() => setShowDetails(!showDetails)}>
          Détails {showDetails ? '<<' : '>>'}
        </button>
      </div>

    </div>
  );
};

export default ProgressModules;