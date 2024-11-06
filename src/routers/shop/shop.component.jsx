import { Fragment, useContext } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPriview from "../../components/category-preview/category-preview.component";

import "./shop.styles.scss";

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    console.log("categoriesMap ", categoriesMap)

    return (
        <div className="shop-container">
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title]

                return <CategoryPriview key={title} title={title} products={products} />
            })}
        </div>
    );
};

export default Shop;
