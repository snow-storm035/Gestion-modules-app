import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
export default function Logout(){
    return <>
    <div>
    <FontAwesomeIcon icon={faRightFromBracket} style={{fontSize:"20px"}}/>
    <button className="logout">Logout</button>

    </div>
    </>
}