export const changeFeatured = (item, e, updateProduct, setUpdateProduct) => {
    if (updateProduct.length === 0) {
        setUpdateProduct([
            ...updateProduct,
            { _id: item, status: e.target.checked },
        ]);
    } else {
        updateProduct.map((element) => {
            if (element._id !== item) {
                return setUpdateProduct([
                    ...updateProduct,
                    { _id: item, status: e.target.checked },
                ]);
            }
        });
        updateProduct.map((element) => {
            if (element._id === item && element.status === false) {
                let prev = updateProduct.filter((product) => product._id != item);
                return setUpdateProduct(prev);
            }
        });
    }
};