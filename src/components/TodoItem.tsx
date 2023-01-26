import { Trash, Check } from 'phosphor-react'
import styles from './TodoItem.module.css'

interface ItemProps {
    id: number
    content: string
    checked: boolean
    onToggleCheckbox: (id: number, newVal: boolean) => void
    onDeleteItem: (id: number) => void
}

export function TodoItem({id, content, checked, onToggleCheckbox, onDeleteItem}: ItemProps) {

    function handleChangeCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
        onToggleCheckbox(id, !checked)
    }

    function handleDeleteItem() {
        onDeleteItem(id)
    }

    return (
        <div className={styles.itemContainer}>
            <div className={styles.checkboxAndContent}>
                <div className={styles.customCheckbox}>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleChangeCheckbox} 
                    />
                    <span className={styles.checkmarkContainer}>
                        <Check className={checked ? '' : styles.checkmark}/>
                    </span>
                </div>
                <span className={checked ? styles.lineThrough : ''}>{content}</span>
            </div>
            <button
                onClick={handleDeleteItem}
                className={styles.deleteIcon}
            >
                <Trash size={20}/>
            </button>
        </div>
    )
}