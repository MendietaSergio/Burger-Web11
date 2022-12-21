export const validations = {
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
            message: "La contraseña debe contener mayusculas, menisculas, números y simbolos."
        }
    }
}