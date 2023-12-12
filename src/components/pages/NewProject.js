import { useNavigate } from 'react-router-dom';

import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";
function NewProject() {

  const history = useNavigate();

  function createPost({project}) {

    if (!project) {
      project = {}; // Inicialize como um objeto vazio se for undefined ou null
    }
    
    /* inicialize cost and services */
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects",{
      method: "POST",
      headers:{
        'content-type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    .then((resp) => resp.json())
    .then((data) => {
      history('/projects', { state: { message: 'Projecto criado com sucesso' } });
    })
    .catch((error) => console.log(error))
  }



  return (
    <div className={styles.newproject_container}>
      <h1>Novo Projecto</h1>
      <p>Crie seu projecto para depois adicionar serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar projecto" />
    </div>
  )

}

export default NewProject;