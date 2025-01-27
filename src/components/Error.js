import { useRouteError } from "react-router-dom";
const Error = ()=>{
    const err = useRouteError();
    return(
        <div>
            <h1>Opps!.....</h1>
            <h3>Something went wrong</h3>
            <h4>I think path mentioned is not right</h4>

            <h2>{err.status + ":" + err.statusText}</h2>
        </div>
    );
};
export default Error;