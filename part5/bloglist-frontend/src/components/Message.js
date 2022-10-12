import React from 'react'

const Message = ({message, type}) => {
    if (!message) return null

    const messageStyle = {
        color: 'gray',
        fontSize: 16,
        fontWeight: 'bold',
        border: 2,
        borderStyle: 'solid',
        borderRadius: 4,
        padding: 2,
        margin: 4,
        display: 'inline-block'
    }

    if (type === 'success')
        messageStyle.color = 'green'

    if (type === 'error')
        messageStyle.color = 'red'
    
    return (
        <div style={messageStyle} >
            {message}
        </div>
    )
}

export default Message