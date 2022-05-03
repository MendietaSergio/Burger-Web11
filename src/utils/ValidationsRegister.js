export const validations = {
    nombre:{
        required:{
            value: true,
            message:"El nombre es requerido"
        }
    },
    usuario:{
        required:{
            value: true,
            message:"El usuario es requerido",
        }
    },
    email: {
        required: {
            value: true,
            message: "El mail es requerido."
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "El email debe ser válido."
        }
    },
    password: {
        required: {
            value: true,
            message: "La contraseña es requerida."
        },
        pattern: {
            value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
            message: "El mail debe contener mayusculas, menisculas, números y simbolos."
        }
    },
    domicilio:{
        required:{
            value: true,
            message:"El nombre es requerido"
        }
    },
    description:{
        minLength:{
            value:20,
            message: "Debe tener al menos 5 carácteres."
        },
        maxLength:{
            value:50,
            message: "El máximo son 20 carácteres."
        },
    },
}
