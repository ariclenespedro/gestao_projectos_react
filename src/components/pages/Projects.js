import { useLocation } from 'react-router-dom';

import Message from "../layouts/Message";

function Projects() {

    const location = useLocation();
    console.log(location.state);
    let message = '';

    if (location.state) {
        message = `${location.state.message}`;
        console.log("Message");
    }

    return(
        <div>
            <h1>Meus Projectos</h1>
            {   
                message ? 
                (<Message type={"success"} msg={message} />) :
                 console.log("Não ha mensagem...")
            }
            
        </div>
    )
    
}

export default Projects;