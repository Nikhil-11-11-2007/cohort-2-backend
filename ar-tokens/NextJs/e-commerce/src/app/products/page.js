import ProductCard from '@/components/ProductCard'
import React from 'react'

async function page() {

    const res = await fetch("https://fakestoreapi.com/products")
    const products = await res.json()
    // console.log(products)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {
                products.map(elem => {
                    return <ProductCard key={elem.id} product={elem} />
                })
            }
        </div>
    )
}

export default page
