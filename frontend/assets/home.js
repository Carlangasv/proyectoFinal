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
    /**
     * Se muestran las opciones que tiene el usuario dependiendo de su rol
     */
    mostrarOpciones() {
      let rol = localStorage.getItem("rol");
      //Si el usuario es un administrador
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
        //Si el usuario es un mecanico 
      } else {
        this.arregloPermisos = [
          {
            nombre: "Ver mis mantenimientos",
            url: "/maintenanceMechanic"
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
