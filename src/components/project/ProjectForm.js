import Input from "../Form/Input";
import Select from "../Form/Select";
import styles from "./ProjectForm.module.css";

function ProjectForm() {
	
	return (
		<form className={styles.form}>
			<Input type="text" name="Nome" text="Nome" placeholder="Insira o nome do projecto"/>
			<Input type="number" name="budget" text="Orçamento" placeholder="Insira o orçamento do projecto"/>
			<Select name="Categoria_id" text="Categoria do projecto"/>
			<div>

				<input type="submit" value="Criar projecto" />
			</div>
		</form>
	)

}

export default ProjectForm;