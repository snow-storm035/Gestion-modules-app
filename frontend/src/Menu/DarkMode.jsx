import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

export default function DarkMode(){

    return <>
   <div>
    < FontAwesomeIcon icon={faMoon} style={{fontSize:"20px"}}/>
      <button className="darkmode">Dark mode</button>

   </div>
    </>
}