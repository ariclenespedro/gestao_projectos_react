import { useLocation } from 'react-router-dom';

import Message from "../layouts/Message";
import styles from "../pages/Projects.module.css";
import Container from "../layouts/Container";
import LinkButton from "../layouts/LinkButton";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from 'react';

function Projects() {

    const [projects, setProjects] = useState([]);

    const location = useLocation();
    console.log(location.state);
    let message = '';

    if (location.state) {
        message = `${location.state.message}`;
        console.log("Message");
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects',{
            method: 'GET',
            headers: { 'Content-Type': 'application/json',},
        }).then((response) => response.json())
        .then( data =>{
            console.log(data);
            setProjects(data);
        }).catch((error) => console.log(error))
    },[]);

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
                {
                    (projects.length > 0)
                    ?
                        (
                            projects.map((project)  => (
                                <ProjectCard 
                                    name={project.name} 
                                    budget={project.budget}
                                    id={project.id}
                                    key={project.id}
                                    category={project.category.name}

                                />   
                            ))
                        )
                    :
                        null
                }
            </Container>
            
        </div>
    )
    
}

export default Projects;