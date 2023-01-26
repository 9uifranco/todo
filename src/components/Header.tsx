import styles from './Header.module.css'

import Logo from '../assets/rocket.svg'

export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={Logo} alt="logo" />
                <strong>to<span>do</span></strong>
            </div>  
        </header>
    )
}