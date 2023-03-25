import axios from 'axios'
import { useState, useEffect } from 'react'
import { getAPI } from '../config/getRoutes'
export const useCategories = () => {
    const [menuCategorie, setMenuCategorie] = useState({})
    const [loading, setLoading] = useState(false)
    const [filteredCategory, setFilteredCategoria] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                await axios.get(getAPI.categories.allCategories)
                    .then((res) => {
                        let hash = {};
                        setMenuCategorie(res.data)
                        setFilteredCategoria(
                            res.data.filter((current) => {
                                let exists = !hash[current.nombre];
                                hash[current.nombre] = true;
                                return exists;
                            })
                        );
                    })
                    .catch((error) => console.log(error))
                    .finally(() => {
                        setLoading(true)
                    })
            } catch (error) {
                console.log(error);
            }
        }
        getCategories()
    }, [])
    return ({ menuCategorie, setLoading, loading, filteredCategory })
}
