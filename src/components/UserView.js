import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";


export default function UserView({ productsData }) {

    const [products, setProducts] = useState();

    useEffect(() => {

        const productsArr = productsData.map(games => {

            if(games.isActive) {
                return (
                    <ProductCard key={games.id} productsProp={games} />
                )
            } else {
                return null
            }
        })

        setProducts(productsArr);
    }, [productsData])

    return (
        <>{products}</>
    )
}