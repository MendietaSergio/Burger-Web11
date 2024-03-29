export const ValidationAddProduct = {
  nombre: {
    required: {
      value: true,
      message: "El nombre del producto es requerido.",
    },
  },
  precio: {
    required: {
      value: true,
      message: "El precio es requerido.",
    },
    min: {
      value: 30,
      message: "Debe ser mayor a 30",
    },
  },

  descuento: {
    minLength: {
      value: 10,
      message: "Debe tener minimo 10 carácteres",
    },
    maxLength: {
      value: 30,
      message: "Debe tener maximo 30 carácteres",
    },
  },
  categoria: {
    required: {
      value: true,
      message: "La categoria es obligatorio",
    },
  },
  subcategoria: {
    required: {
      value: true,
      message: "La subcategoria es obligatorio",
    },
  },
  descripcion: {
    minLength: {
      value: 20,
      message: "Debe tener al menos 20 carácteres.",
    },
    maxLength: {
      value: 800,
      message: "El máximo son 800 carácteres.",
    },
  },
  img: {
    required: {
      value: true,
      message: "La imagen es requerida",
    },
  },
  oferta: {
    required: {
      value: true,
      message: "La oferta es requerida",
    },
  },
  descuento: {
    required: {
      value: true,
      message: "El descuento es requerido",
    },
    min: {
      value: 5,
      message: "El minimo de descuento es de 5%.",
    },
  },
  tipo: {
    required: {
      value: true,
      message: "El tipo es requerido",
    },
  },
};
