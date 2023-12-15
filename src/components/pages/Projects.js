import { useLocation } from 'react-router-dom';

import Message from "../layouts/Message";
import styles from "../pages/Projects.module.css";
import Container from "../layouts/Container";
import LinkButton from "../layouts/LinkButton";

function Projects() {

    const location = useLocation();
    console.log(location.state);
    let message = '';

    if (location.state) {
        message = `${location.state.message}`;
        console.log("Message");
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projectos</h1>
                <LinkButton to="/newproject" text="Criar projecto" />
            </div>
            {   
                message 
                ? 
                    (<Message type={"success"} msg={message} />)
                : 
                    console.log("Não ha mensagem...")
            }
            <Container customClass="start">
                <p>...Projectos</p>
            </Container>
            
        </div>
    )
    
}

export default Projects;