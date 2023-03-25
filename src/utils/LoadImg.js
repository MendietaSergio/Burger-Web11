let _URL = window.URL || window.webkitURL;
const VITE_API_KEY = import.meta.env.VITE_API_KEY
const VITE_UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET
export const changeImg = (e, setValue, setNewImg) => {
    if (e !== undefined) {
        const reader = new FileReader();
        const img = new Image();
        img.onload = function () {
            if (img.width <= 1000 && img.height <= 1000) {
                reader.readAsDataURL(e);
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setNewImg(reader.result);
                    }
                };
            } else {
                setValue('img', undefined)
                setNewImg("http://localhost:3000/src/img/imgDefault.png")
                alert("El tamaño de la imagen es de " + this.width + "x" + this.height);
            }
        };
        img.onerror = function () {
            alert("not a valid file: " + e.type);
        };
        img.src = _URL.createObjectURL(e);
    }
}
export const newImg = (image) => {
    const img = new FormData();
    img.append("file", image);
    img.append("api_key", VITE_API_KEY);
    img.append("upload_preset", VITE_UPLOAD_PRESET);
    return img;
}
export const deleteImage = (showImgViewLoad, setShowImgViewLoad, setImgChange, setNewImg, img) => {
    if (showImgViewLoad) {
        setNewImg("http://localhost:3000/src/img/imgDefault.png");
        setShowImgViewLoad(false);
        setImgChange(true);
    } else {
        setNewImg(img);
        setShowImgViewLoad(true);
        setImgChange(false);
    }
}
export const changeLogo = (e, setViewImg, setImgChange, setValue) => {
    let test = document.getElementById('img')
    if (e.target.files[0] !== undefined) {
        const reader = new FileReader();
        const img = new Image();
        img.onload = function () {
            if (img.width <= 360 && img.height <= 360) {
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setViewImg(reader.result);
                        setImgChange(true)
                    }
                };
                reader.readAsDataURL(e.target.files[0]);
            } else {
                setImgChange(false)
                alert("El tamaño de la imagen es de " + this.width + "x" + this.height);
                e.target.value = ""
            }
        };
        img.onerror = function () {
            alert("not a valid file: " + e.target.files[0].type);
        };
        img.src = _URL.createObjectURL(e.target.files[0]);
    } else {
        setImgChange(false)
    }
};