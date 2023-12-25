import { useState, useEffect } from 'react'
import Input from '../Form/Input'
import Select from '../Form/Select'
import SubmitButton from '../Form/SubmitButton'

import styles from './ProjectForm.module.css'

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [project, setProject] = useState(projectData || {})
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data)
      })
  }, [])

  const submit = (e) => {
    e.preventDefault();
    console.log('Valores do projeto:', project);
    handleSubmit({project}); // Passa diretamente o objeto project, sem envolvê-lo
  }
  

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value })
	/* console.log(project); */
  }

  function handleCategory(e) {
    console.log('Seleção de categoria:', e.target.options[e.target.selectedIndex].text);
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
    console.log("Projecto");
    console.log(project);
  }

  console.log("Categiria");
  console.log(categories);
  

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name}
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project.budget}
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ''}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}
  
  export default ProjectForm