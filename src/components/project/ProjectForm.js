function ProjectForm() {
	return (
		<form>
			<div>
				<input type="text" placeholder="Insira o nome do projecto" />
			</div>
			<div>
				<input type="number" placeholder="Insira o orçamento do projecto" />
			</div>
			<div>
				<select name="category_id">
					<option disabled selected> selecione a categoria

					</option>
				</select>
			</div>
			<div>
				<input type="submit" value="Criar projecto" />
			</div>
		</form>
	)

}

export default ProjectForm;