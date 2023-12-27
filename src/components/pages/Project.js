import styles from "./Project.module.css";
import { parse, v4  as uuidv4 } from "uuid";
import Loading from "../layouts/Loading";

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import Container from "../layouts/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layouts/Message";
import ServiceForm from "../Service/ServiceForm";

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

    function createService(project) {

        /* last service */
        const lastService = project.services[project.services.length - 1];
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;
        
        const newCost = parseFloat(lastServiceCost) + parseFloat(project.cost);

        // maximum value validation
        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço!');
            setType('error');
            project.services.pop();
            return false;
        }

        // add service cost to project cost total
        project.cost = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            /* setServices(data.services)
            setShowServiceForm(!showServiceForm) */
            setMessage('Serviço adicionado!')
            setType('success')
        });
 
        
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
                                <div className={styles.form}>
                                    {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar serviço"
                                        projectData={project}
                                    />)}
                                </div>
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