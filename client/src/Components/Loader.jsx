import React from 'react'
import styles from "../Stylesheet/Loader.module.css"
const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.bubble}></div>
            <div className={styles.bubble}></div>
            <div className={styles.bubble}></div>
        </div>

    )
}

export default Loader