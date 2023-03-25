export const validations = {
    textStart: {
        required: {
            value: true,
            message: "El texto inicial es requerido"
        },
        minLength: {
            value: 20,
            message: "El mínimo es de 20 cáracteres."
        }
    },
    textEnd: {
        required: {
            value: true,
            message: "El texto final es requerido"
        },
        minLength: {
            value: 20,
            message: "El mínimo es de 20 cáracteres."
        }
    }
}