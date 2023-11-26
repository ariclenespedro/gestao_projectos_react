import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";
function NewProject() {
  return (
    <div className={styles.newproject_container}>
      <h1>Novo Projecto</h1>
      <p>Crie seu projecto para depois adicionar serviços</p>
      <ProjectForm />
    </div>
  )

}

export default NewProject;