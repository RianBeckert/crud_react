import { createContext, useState } from "react";
import PropTypes from "prop-types"

export const StockContext = createContext ({})

StockContextProvider.propTypes = {
    children: PropTypes.node
}

export function StockContextProvider ({ children }) { 
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem('rian-stock')
        if (!storedItems) return []    // Se não tiver items armazenados voltar um array vazio
        const items = JSON.parse(storedItems)  // Se tiver retornar os items
        items.forEach((item) => {
            item.createdAt = new Date(item.createdAt)
            item.updateAt = new Date(item.updateAt)
        })
        return items
    })
//Função de adicionar items no localstorage
    
    const addItem = (item) => {
        setItems(currentState => {
            const updateItems = [item, ...currentState]
            localStorage.setItem('rian-stock', JSON.stringify(updateItems))
            return updateItems
        })
    }

    const getItem = (itemId) => {
        return items.find(item => item.id === +itemId)
    }
//Atualizar items
    const updateItem = (itemId, newAttributes) => {
        setItems(currentState => {
            const itemIndex = currentState.findIndex(item => item.id === +itemId)
            const updateItems = [...currentState]
            Object.assign(updateItems[itemIndex], newAttributes, { updatedAt: new Date()})
            localStorage.setItem('rian-stock', JSON.stringify(updateItems))
            return updateItems
        })
    }
//Função para excluir um item

    const deleteItem = (itemId) => {
        setItems(currentState => {
            const updateItems = currentState.filter(item => item.id !== itemId)
            localStorage.setItem('rian-stock', JSON.stringify(updateItems))
            return updateItems
        })
    }

    const stock = {
        items,
        addItem,
        getItem,
        updateItem,
        deleteItem
    }
    return (
        <StockContext.Provider value={stock}>
            {children}
        </StockContext.Provider>
    )
}