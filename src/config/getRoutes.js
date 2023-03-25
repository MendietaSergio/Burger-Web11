const API_SERVER = import.meta.env.VITE_API_URL
const API_URL_CLOUDINARY = import.meta.env.VITE_API_URL_CLOUDINARY
export const getAPI = {
    main: {
        home: `${API_SERVER}`,
        data: `${API_SERVER}/informations`
    },
    auth: {
        login: `${API_SERVER}/auth/signin`,
        register: `${API_SERVER}/auth/signup`,
        recoverPass: `${API_SERVER}/user/recoverPass`,
    },
    user: {
        allUser: `${API_SERVER}/user/allUser`,//todos ,update,delete
        changePasswordUser: `${API_SERVER}/user/changePassword`,
        delteUser: `${API_SERVER}/user`,
        config: `${API_SERVER}/user/configuraciones`,
        updateUser: `${API_SERVER}/user`
    },
    products: {
        allProducts: `${API_SERVER}/products`,
        newProduct: `${API_SERVER}/products/new`,
        detailProduct: `${API_SERVER}/products/detail`,
        updateProduct: `${API_SERVER}/products/update`,
        deleteProduct: `${API_SERVER}/products/delet-product`,
        featureProduct: `${API_SERVER}/products/updateFeatureProduct`
    },
    categories: {
        allCategories: `${API_SERVER}/products/categories`
    },
    cloudinary: {
        upload: API_URL_CLOUDINARY,
    }

}