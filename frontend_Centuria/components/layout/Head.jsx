'use client'
import { AppContext } from '@/context/AppContext.jsx'
import { useContext } from 'react';

export default function Head() {
    const { pagetitle } = useContext(AppContext);
    return (
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>{pagetitle}</title>
        </head>
    )
}