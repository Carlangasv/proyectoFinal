import axios from "axios";

export default {
  data() {
    return {
      validacion_actualizar: "",
      message: "crud motos",
      url: "http://localhost:3001/api/v1/",
      enEdicion: false,
      showTable: true,
      validacion: "",
      token: "",
      moto: {
        placa: "",
        estado: "",
        clase: "",
        marca: "",
        modelo: "",
        color: "",
        cilindraje: "",
        id_propietario: "",
        nro_soat: "",
        vencimiento_soat: "",
        nro_tecno: "",
        vencimiento_tecno: ""
      },
      lista_motos: []
    };
  },
  beforeMount() {
    this.cargarMotos();
  },
  computed: {
    validacionPlaca() {
      if (this.validacion_actualizar) return true;
      return this.validar_condicion(this.moto.placa.length > 0);
    },
    validacionEstado() {
      return this.validar_condicion(this.moto.estado.length > 0);
    },
    validacionClase() {
      return this.validar_condicion(this.moto.clase.length > 0);
    },
    validacionMarca() {
      return this.validar_condicion(this.moto.marca.length > 0);
    },
    validacionModelo() {
      return this.validar_condicion(this.moto.modelo.length > 0);
    },
    validacionColor() {
      return this.validar_condicion(this.moto.color.length > 0);
    },
    validacionCilindraje() {
      return this.validar_condicion(this.moto.cilindraje.length > 0);
    },
    validacionId_propietario() {
      return this.validar_condicion(this.moto.id_propietario.length > 0);
    },
    validacionNro_soat() {
      return this.validar_condicion(this.moto.nro_soat.length > 0);
    },
    validacionVencimiento_soat() {
      return this.validar_condicion(this.moto.vencimiento_soat.length > 0);
    },
    validacionNro_tecno() {
 
      return this.validar_condicion(this.moto.nro_tecno.length > 0);
    },
    validacionVencimiento_tecno() {

      return this.validar_condicion(this.moto.vencimiento_tecno.length > 0);
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

    cargarMotos() {
      this.token = localStorage.getItem("token");
      axios
        .get(`${this.url}motos/`, { headers: { token: this.token } })
        .then(response => {
          this.lista_motos = response.data.info;
          for (let i in this.lista_motos) {
            this.lista_motos[i].acciones = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    crearMotos() {
      if (
        this.validacion &&
        this.moto.placa.length < 7 &&
        this.moto.cilindraje.length < 5 &&
        this.moto.modelo.length < 5
      ) {
        axios
          .post(`${this.url}motos/`, this.moto, {
            headers: { token: this.token }
          })
          .then(response => {
            this.lista_motos.push(response.data.info);
            this.moto = {
              placa: "",
              estado: "",
              clase: "",
              marca: "",
              modelo: "",
              color: "",
              cilindraje: "",
              id_propietario: "",
              nro_soat: "",
              vencimiento_soat: "",
              nro_tecno: "",
              vencimiento_tecno: ""
            };
            this.cargarMotos();
            alert("Moto Insertada Correctamente");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("Llene todos los campos correctamente");
      }
    },
    eliminarMotos({ item }) {
      axios
        .delete(`${this.url}motos/${item.placa}`, {
          headers: { token: this.token }
        })
        .then(response => {
          let posicion = this.lista_motos.findIndex(
            lista_motos => lista_motos.placa == item.placa
          );
          this.lista_motos.splice(posicion, 1);
          alert("Moto Eliminada");
        })
        .catch(error => {
          console.log(error);
        });
    },
    cargarMoto({ item }) {
      this.validacion_actualizar = true;
      axios
        .get(`${this.url}motos/${item.placa}`, {
          headers: { token: this.token }
        })

        .then(response => {
          var array = response.data.info;
          console.log(array)
          this.enEdicion = true;
          this.moto.placa = array[0].placa;
          this.moto.estado = array[0].estado;
          this.moto.clase = array[0].clase;
          this.moto.marca = array[0].marca;
          this.moto.modelo = array[0].modelo;
          this.moto.color = array[0].color;
          this.moto.cilindraje = array[0].cilindraje;
          this.moto.id_propietario = array[0].id_propietario;
          this.moto.nro_soat = array[0].nro_soat;
          this.moto.vencimiento_soat = array[0].vencimiento_soat;
          this.moto.nro_tecno = array[0].nro_tecnomecanica;
          this.moto.vencimiento_tecno = array[0].vencimiento_tecnomecanica;
        })
        .catch(error => {
          console.log(error);
        });
    },
    actualizarMotos() {
      if (
        this.validacion &&
        this.moto.placa.length < 7 &&
        this.moto.cilindraje.length < 5 &&
        this.moto.modelo.length < 5
      ) {
        axios
          .put(this.url + "motos/" + this.moto.placa, this.moto, {
            headers: { token: this.token }
          })
          .then(response => {
            console.log(response)
            let posicion = this.lista_motos.findIndex(
              motos => motos.placa == this.moto.placa
            );
            this.lista_motos.splice(posicion, 1, this.moto);
            this.enEdicion = false;
            this.moto = {
              placa: "",
              estado: "",
              clase: "",
              marca: "",
              modelo: "",
              color: "",
              cilindraje: "",
              id_propietario: "",
              nro_soat: "",
              vencimiento_soat: "",
              nro_tecno: "",
              vencimiento_tecno: ""
            };
            alert("Moto Actualizada Correctamente");
            this.validacion_actualizar = false;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    }
  }
};
