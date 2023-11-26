import styles from "./Link.module.css";
import { Link } from "react-router-dom";

function LinkButton(props) {
	return (
		<Link className={styles.btn} to={props.to}>
			{props.text}
		</Link>
	)

}

export default LinkButton;