import { useLocation } from 'react-router-dom';

import Message from "../layouts/Message";
import styles from "../pages/Projects.module.css";
import Container from "../layouts/Container";
import LinkButton from "../layouts/LinkButton";
import Loading from "../layouts/Loading";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from 'react';

function Projects() {

    // Construct the component with the default properties of the component 
    const [projects, setProjects] = useState([]);
    // Set loading state for the component show projects
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('');

    const location = useLocation();
    console.log(location.state);
    let message = '';

    if (location.state) {
        message = `${location.state.message}`;
        console.log("Message");
    }

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            },
        ).then(response => response.json()
            .then(data => {
                setProjects(projects.filter( project => project.id !== id ));
                setProjectMessage('Project deleted successfully');
            })
        )
         .catch(err => console.log(err));
        
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', },
            }).then((response) => response.json())
                .then(data => {
                    console.log(data);
                    setProjects(data);
                    setRemoveLoading(true);
                }).catch((error) => console.log(error))
        }, 3000);
    }, []);

    return (
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
            {projectMessage !== '' ? (<Message type={"success"} msg={projectMessage}/>) : null}
            {!removeLoading ? (<Loading />) : null}
            {removeLoading && projects.length === 0 ?<p>Não há projectos registrados</p> : null}
            <Container customClass="start">
                {
                    (projects.length > 0)
                        ?
                        (
                            projects.map((project) => (
                                <ProjectCard
                                    name={project.name}
                                    budget={project.budget}
                                    id={project.id}
                                    key={project.id}
                                    category={project.category.name}
                                    handleRemove={removeProject}
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