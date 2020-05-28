const axios = require("axios");
export default {
  data() {
    return {
      arregloPermisos: []
    };
  },
  mounted() {
    this.mostrarOpciones();
  },
  methods: {
    mostrarOpciones() {
      let rol = localStorage.getItem("rol");
      if (rol == 2) {
        this.arregloPermisos = [
          {
            nombre: "Administrar Usuarios",
            url: "/users"
          },
          {
            nombre: "Gestionar Motos",
            url: "/motorcycles"
          },
          {
            nombre: "Asignar Moto",
            url: "/maintenancesAdmin"
          },
          {
            nombre: "Salir",
            url: "http://localhost:3000/"
          }
        ];
      } else {
        this.arregloPermisos = [
          {
            nombre: "Ver mis mantenimientos",
            url: ""
          },
          {
            nombre: "Gestionar Moto",
            url: "/motorcycles"
          },
          {
            nombre: "Salir",
            url: "http://localhost:3000"
          }
        ];
      }
    }
  }
};
