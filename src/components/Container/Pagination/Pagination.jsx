import React from 'react'

export const Pagination = ({
    paginate,
    totalClients,
    clientsPage,
    totalProducts,
    productsPage,
    viewProducts,
    viewClients }) => {
    const pageNumbers = [];
    if (viewProducts) {

        for (let i = 1; i <= Math.ceil(totalProducts / productsPage); i++) {
            pageNumbers.push(i)
        }
    }
    if (viewClients) {
        for (let i = 1; i <= Math.ceil(totalClients / clientsPage); i++) {
            pageNumbers.push(i)
        }
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className="page-item ">
                        <a onClick={() => paginate(number)} className='page-link'>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
