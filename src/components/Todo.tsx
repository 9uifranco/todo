import { PlusCircle } from 'phosphor-react'
import { useState } from 'react'
import { TodoItem } from './TodoItem'
import styles from './Todo.module.css'

import clipboardImg from '../assets/clipboard.svg'

const data = [
    {
        id: 1,
        content: "Cozinhar almoço",
        checked: false
    },
    {
        id: 2,
        content: "Cagar",
        checked: true
    }
]

const data2 = []

export function Todo() {

    const [todoList, setTodoList] = useState(data)
    const [newItemContent, setNewItemContent] = useState('')
    
    function toggleCheckbox(id: number, newVal: boolean) {
        const updatedTodoList = todoList.map(item => {
            return item.id == id ? { ...item, checked: newVal } : item
        })

        setTodoList(updatedTodoList) 
    }

    function deleteItem(id: number) {
        const updatedTodoList = todoList.filter(item => item.id !== id)
        setTodoList(updatedTodoList)
    }

    function getCompletedAmount() {
        let completed = 0
        todoList.forEach(item => {
            if(item.checked) {
                completed++
            }
        })
        return completed
    }

    function handleNewItemChange(event: React.FormEvent<HTMLInputElement>) {
        setNewItemContent(event.currentTarget.value)
    }

    function addNewItem(event: React.FormEvent) {
        event.preventDefault()

        if(isNewItemContent)
            return false

        const newTodoItem = {
            id: todoList.length == 0 ? 1 : findAvailableID(todoList[0].id),
            content: newItemContent,
            checked: false
        }
        
        setTodoList([...todoList, newTodoItem])
        setNewItemContent('')
    }

    function findAvailableID(startNumber: number) {
        let possibleID = startNumber
        todoList.forEach(item => {
            if(item.id === possibleID) {
                possibleID++
                findAvailableID(possibleID)
            }
            else {
                return 
            }
        })
        return possibleID
    }

    const isNewItemContent = newItemContent.trim() == ''

    return (
        <main className={styles.todoContainer}>
            <form className={styles.todoInput}>
                <input
                    type="text"
                    placeholder='Adicione uma nova tarefa'
                    value={newItemContent}
                    onChange={handleNewItemChange}
                />
                <button
                    type='submit'
                    disabled={isNewItemContent}
                    onClick={addNewItem}
                >
                    <span>Criar</span><PlusCircle size={20}/>
                </button>
            </form>
            <div className={styles.todoListContainer}>
                <div className={styles.todoStatus}>
                    <div>
                        <strong className={styles.createdStatusText}>
                            Tarefas criadas
                        </strong>
                        <strong className={styles.statusNumber}>
                            {todoList.length}
                        </strong>
                    </div>
                    <div>
                        <strong className={styles.finishedStatusText}>
                            Concluídas
                        </strong>
                        <strong className={styles.statusNumber}>
                            {todoList.length == 0 ? 0 : `${getCompletedAmount()}` + " de " + `${todoList.length}`}
                        </strong>
                    </div>
                </div>
                <div className={styles.todoList}>
                    {
                        (todoList.length > 0) ?
                            todoList.map(item => (
                                <TodoItem
                                    key={item.id}
                                    id={item.id}
                                    content={item.content}
                                    checked={item.checked}
                                    onToggleCheckbox={toggleCheckbox}
                                    onDeleteItem={deleteItem}
                                />
                            )) :
                                <div className={styles.noItem}>
                                    <img src={clipboardImg} alt="clipboard" />
                                    <strong>Você ainda não tem tarefas cadastradas</strong> 
                                    <span>Crie tarefas e organize seus itens a fazer</span>
                                </div>
                    }
                </div>
            </div>
        </main>
    )
}