import axios from "axios";

export default {
  data() {
    return {
      token: "",
      url: "http://localhost:3001/api/v1/",
      message: "crud mantenimientos",
      enEdicion: false,
      showTable: true,
      validacion: "",
      lista_empleados: [],
      lista_motos: [],
      lista_mantenimientos: [],
      mantenimiento: {
        id_mecanico: "",
        placa: "",
        fecha: "",
        trabajos_realizados: "",
        horas_invertidas: ""
      }
    };
  },
  beforeMount() {
    this.cargarMantenimientos();
  },
  mounted() {
    this.llenarListas();
  },
  computed: {
    validacionId_mecanico() {
      return this.validar_condicion(this.mantenimiento.id_mecanico.length > 0);
    },
    validacionPlaca() {
      return this.validar_condicion(this.mantenimiento.placa.length > 0);
    },
    validacionFecha() {
      return this.validar_condicion(this.mantenimiento.fecha.length > 0);
    },
    validacionTrabajos_realizados() {
      return this.validar_condicion(
        this.mantenimiento.trabajos_realizados.length > 0
      );
    },
    validacionHoras_invertidas() {
      return this.validar_condicion(
        this.mantenimiento.horas_invertidas.length >= 0
      );
    }
  },
  methods: {
    validar_condicion(bool) {
      if (bool == false) {
        this.validacion = false;
        return false;
      } else {
        this.validacion = true;
        return true;
      }
    },
    llenarListas() {
      this.token = localStorage.getItem("token");
      axios
        .get(this.url + "usuarios", { headers: { token: this.token } })
        .then(response => {
          let array = response.data.info;
          for (let i in array) {
            if (array[i].rol == 1) {
              let valor = array[i].documento;
              let texto = array[i].nombre + array[i].apellidos;
              let opcion = { value: valor, text: texto };
              this.lista_empleados.push(opcion);
            }
          }
        });

      axios
        .get(this.url + "motos", { headers: { token: this.token } })
        .then(response => {
          let array = response.data.info;
          for (let i in array) {
            let valor = array[i].placa;
            let texto = array[i].placa;
            let opcion = { value: valor, text: texto };
            this.lista_motos.push(opcion);
          }
        });
    },
    cargarMantenimientos() {
      this.token = localStorage.getItem("token");
      axios
        .get(`${this.url}mantenimientos`, { headers: { token: this.token } })
        .then(response => {
          this.lista_mantenimientos = response.data.info;
          for (let i in this.lista_mantenimientos) {
            this.lista_mantenimientos[i].acciones = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    crearMantenimiento() {
      if (this.validacion) {
        axios
          .post(this.url + "mantenimientos", this.mantenimiento, {
            headers: { token: this.token }
          })
          .then(response => {
            console.log(response);
            this.lista_mantenimientos.push(response.data.info);
            this.mantenimiento = {
              id_mecanico: "",
              placa: "",
              fecha: "",
              trabajos_realizados: "",
              horas_invertidas: ""
            };
            this.cargarMantenimientos();
            alert("Moto Insertada Correctamente");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("Llene todos los campos correctamente");
      }
    },
    eliminarMantenimiento({ item }) {
      console.log(item);

      axios
        .delete(
          `${this.url}mantenimientos/${item.placa}/${item.id_mecanico}/${item.fecha}`,
          { headers: { token: this.token } }
        )
        .then(response => {
          let posicion = this.lista_mantenimientos.findIndex(
            lista_mantenimientos =>
              lista_mantenimientos.placa == item.placa &&
              lista_mantenimientos.id_mecanico == item.id_mecanico &&
              lista_mantenimientos.fecha == item.fecha
          );
          this.lista_mantenimientos.splice(posicion, 1);
          alert("Usuario Eliminado");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
