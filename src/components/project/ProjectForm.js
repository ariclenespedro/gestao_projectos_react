import { useEffect, useState } from "react";
import Input from "../Form/Input";
import Select from "../Form/Select";
import SubmitButton from "../Form/SubmitButton";
import styles from "./ProjectForm.module.css";

function ProjectForm({handlerSubmit,projectData,btnText}) {

	const [categories, setCategories] = useState([]);
	const [project, setProject] = useState({} || projectData);

	useEffect( () => {
		fetch('http://localhost:5000/categories',{
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		})
		.then((response) => response.json())
		.then((data) => {
			setCategories(data)
		})
		.catch((error) => console.log(error))
	},[]);
	
	return (
		<form className={styles.form}>
			<Input type="text" name="Nome" text="Nome" placeholder="Insira o nome do projecto"/>
			<Input type="number" name="budget" text="Orçamento" placeholder="Insira o orçamento do projecto"/>
			<Select name="Categoria_id" text="Categoria do projecto" options={categories}/>
			<SubmitButton text={btnText}/>
			
		</form>
	)

}

export default ProjectForm;