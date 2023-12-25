import styles from "./Project.module.css";
import Loading from "../layouts/Loading";

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import Container from "../layouts/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layouts/Message";

function Project() {

    
    const { id } = useParams();
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setshowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`,
                {
                    method: "GET",
                    headers: {'content-type': 'application/json'},
                },
            ).then(response => response.json())
            .then((data) => {
                setProject(data);
            })
            .catch(error => console.log(error));
        }, 300);

    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setshowServiceForm(!showServiceForm);
    }

    function editPost({project}) {

        setMessage('');
        // budget validation
        if (project.budget < project.cost) {
            setMessage('O Orçamento não pode ser menor que o custo do projeto!')
            setType('error')
          return false
        }
    
        fetch("http://localhost:5000/projects/"+project.id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data);
            setShowProjectForm(!showProjectForm);
            setMessage('Projeto atualizado!');
            setType('success');
          })
      }

    return (
        <>
            {project.name ?   
                (
                    <div className={styles.project_details}>
                        <Container customClass="column">
                            {message ? (<Message msg={message} type={type} />) : null}
                            <div className={styles.details_container}>
                                <h1>Project: {project.name}</h1>
                                <button className={styles.btn} onClick={toggleProjectForm}>
                                    {!showProjectForm ? 'Editar projecto' : 'Fechar' } 
                                </button>
                                {!showProjectForm ? 
                                    (   <div className={styles.form}>
                                            <p>
                                                <span>Categoria:</span> {project.category.name}
                                            </p>
                                            <p>
                                                <span>Total Orçamento:</span> {project.budget}Kzs
                                            </p>
                                            <p>
                                                <span>Total Utilizado:</span> {project.cost}Kzs
                                            </p>
                                        </div> 
                                    )
                                    :
                                    (<div  className={styles.form}>
                                        <ProjectForm handleSubmit={editPost} btnText={"Concluir edição"} projectData={project} actionForm='edit' />
                                    </div>
                                    )
                                }
                            </div>
                            <div className={styles.service_form_container}>
                                <h2>Adicione um serciço:</h2>
                                <button className={styles.btn} onClick={toggleServiceForm}>
                                    {!showServiceForm ? 'Adicionar serviço' : 'Fechar' } 
                                </button>
                            </div>
                            <div className={styles.project_info}>
                                {showServiceForm && (<div>Formulario do serviço</div>)}
                            </div>
                            <h2>Serviços:</h2>
                            <Container customClass="start">
                                
                            </Container>
                        </Container>
                    </div>
                ) :
                (<Loading/>)
            
            }
        </>
    )
    
}

export default Project