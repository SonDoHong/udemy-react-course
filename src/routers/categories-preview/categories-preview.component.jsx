import { Fragment, useContext } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPriview from "../../components/category-preview/category-preview.component";

import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    console.log("categoriesMap ", categoriesMap)

    return (
        <div className="categoies-preview-container">
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title]

                return <CategoryPriview key={title} title={title} products={products} />
            })}
        </div>
    );
};

export default CategoriesPreview;
