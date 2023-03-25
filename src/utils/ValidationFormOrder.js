export const validationFormOrder = {
    nombre: {
        required: {
            value: true,
            message: "Su nombre es requerido.",
        },
        minLenght: {
            value: 2,
            message: "Debe ser mayor a 2",
        },
    },
    telefono: {
        required: {
            value: true,
            message: "Su telefono es requerido.",
        },
        minLenght: {
            value: 10,
            message: "Debe ser mayor a 10 números",
        },
    },
    direccion: {
        required: {
            value: true,
            message: "Su direccion es requerida.",
        },
        minLenght: {
            value: 2,
            message: "Debe ser mayor a 2",
        },
    },
    entrecalles: {
        required: {
            value: true,
            message: "Ingrese las entrecalles",
        },
        minLenght: {
            value: 5,
            message: "Debe ser mayor a 5",
        },
    },
    pagaCon: {
        required: {
            value: true,
            message: "Ingrese la información.",
        },
    },
    abona: {
        required: {
            value: true,
            message: "Ingrese con cuanto va a abonar.",
        },
    }

}