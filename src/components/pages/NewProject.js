
import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";
function NewProject() {



  function createPost({project}) {

    
    /* inicialize cost and services */
    project.cost = 0;
    project.services = [];

    fetch("http://localhost/projects:5000",{
      method: "POST",
      headers:{
        'content-type': 'application/json',
      },
      body: JSON.stringify(project),
    }).then((response) => response.json())
    .then(
      (data) => {
        console.log(data)
      }).catch((error) => console.log(error))
  }



  return (
    <div className={styles.newproject_container}>
      <h1>Novo Projecto</h1>
      <p>Crie seu projecto para depois adicionar serviços</p>
      <ProjectForm handlerSubmit={createPost} btnText="Criar projecto" />
    </div>
  )

}

export default NewProject;