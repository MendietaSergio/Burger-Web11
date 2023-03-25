import axios from 'axios';
import { useState } from 'react'
import { getAPI } from '../config/getRoutes';
export const useAllProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewCant, setViewCant] = useState(false);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [feacturedProducts, setFeaturedProducts] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const getProducts = async ({ allProducts, idCategoria, idSubcategoria, relatedView, productDetail }) => {
        setLoading(true);
        await axios
            .get(getAPI.products.allProducts)
            .then((res) => {
                if (idCategoria !== undefined) {
                    if (idSubcategoria) {
                        setProducts(
                            res.data.filter(
                                (idSubCategorie) =>
                                    idSubCategorie.nombre_categoria.categoria === idSubcategoria
                            ))
                        setTotal(
                            res.data.filter(
                                (idSubCategorie) =>
                                    idSubCategorie.nombre_categoria.categoria === idSubcategoria
                            ).length
                        );
                    } else {
                        let categorie =
                            idCategoria.charAt(0).toUpperCase() + idCategoria.slice(1);
                        setProducts(
                            res.data.filter(
                                (idCategorie) => idCategorie.nombre_categoria.nombre === categorie
                            )
                        );
                        setTotal(
                            res.data.filter(
                                (idCategorie) => idCategorie.nombre_categoria.nombre === categorie
                            ).length
                        );
                    }
                }
                if (!relatedView) {
                    setFeaturedProducts(res.data.filter((item) => item.destacado === true));
                }
                if (relatedView) {
                    let object = res.data.filter(
                        (item) => item.id_categoria === productDetail.id_categoria
                    );
                    setRelatedProducts(
                        object.filter((item) => item._id !== productDetail._id)
                    );
                }
                if (allProducts) {
                    setProducts(res.data);
                    setTotal(res.data.length);
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                    setCurrentPage(1);
                }, 3000)
            });
        setViewCant(true);
    };
    return ({
        getProducts,
        setCurrentPage,
        setProducts,
        setLoading,
        setViewCant,
        setTotal,
        currentPage,
        products,
        viewCant,
        total,
        loading,
        feacturedProducts,
        relatedProducts
    })
}
