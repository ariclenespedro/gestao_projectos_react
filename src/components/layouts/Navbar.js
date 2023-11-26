import { Link } from "react-router-dom";

import Container from "./Container";

import styles from "./Navbar.module.css"; // estilos do navigation
import logo from "../../img/costs_logo.png";
function Navbar() {

  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="LogoCosts" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link  to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link  to="/projects">Projectos</Link>
          </li>
          <li className={styles.item}>
            <Link to="/company">Empresa</Link>
          </li>
          <li className={styles.item}>
            <Link to="/contacts">Contacto</Link>
          </li>
        </ul>
      </Container>
    </nav>
  )

}

export default Navbar;