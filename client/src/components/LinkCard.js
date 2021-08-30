import React from 'react'

export const LinkCard = ({link}) => {
    return (
        <div>
            <h2>LINK</h2>
            <p>Your link: <a href={link.to} target="_blank" rel={"noopener noreferrer"}>{link.to}</a></p>
            <p>From: <a href={link.from} target="_blank" rel={"noopener noreferrer"}>{link.from}</a></p>
            <p>Count clicks: <strong>{link.clicks}</strong></p>
            <p>Date create: <strong>{new Date(link.clicks).toLocaleDateString()}</strong></p>
        </div>
    )
}