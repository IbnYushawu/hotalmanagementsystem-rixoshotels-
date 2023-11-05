
import { RingSpinner,FireworkSpinner} from "react-spinners-kit";

const LoaderView=()=>{
    return(<div className="loadingcontainer" style={{height:`${window.innerHeight}px`}}>
  <RingSpinner size={30} color="blue"/>

    </div>)
}


export default LoaderView