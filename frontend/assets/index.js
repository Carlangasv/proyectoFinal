import axios from "axios";

export default {
  beforeMount() {
    //this.carga_pagina();
  },
  data() {
    return {
      url: "",
      message: "INICIAR SESIÓN",
      mensaje2: "",
      usuario: {
        id: "",
        clave: "",
        correo: "",
        descripcion: "",
        primera_vez: "",
      }
    };
  },

  computed: {
    validar_id() {
      return this.usuario.id.length > 0;
    },

    validar_clave() {
      return this.usuario.clave.length > 0;
    },
  }
}