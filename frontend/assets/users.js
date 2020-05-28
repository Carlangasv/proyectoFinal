import axios from "axios";

export default {
  data() {
    return {
      validacion_actualizar: "",
      message: "crud Usuarios",
      token: "",
      enEdicion: false,
      showTable: true,
      url: "http://localhost:3001/api/v1/",
      validacion: "",
      usuario: {
        documento: "",
        nombre: "",
        apellidos: "",
        celular: "",
        correo: "",
        clave: ""
      },
      lista_usuarios: [{}],
      tipo_documento: [],
      opciones_documentos: [
        {
          value: null,
          text: "Seleccione el tipo de documento",
          disabled: true
        },
        { value: "CC", text: "01 - CC" },
        { value: "CE", text: "02 - CE" },
        { value: "NIT", text: "03 - NIT" },
        { value: "Pasaporte", text: "04 - Pasaporte" }
      ],

      rol: [],
      opciones_roles: [
        { value: null, text: "Seleccione el rol del usuario", disabled: true },
        { value: "01", text: "01 - Mécanico" },
        { value: "02", text: "02 - Administrador" }
      ]
    };
  },

  beforeMount() {
    this.mostrarUsuarios();
  },
  computed: {
    validacionId() {
      if (this.validacion_actualizar) return true;
      return this.validar_condicion(this.usuario.documento.length > 0);
    },
    validacionNombre() {
      return this.validar_condicion(this.usuario.nombre.length > 0);
    },
    validacionApellido() {
      return this.validar_condicion(this.usuario.apellidos.length > 0);
    },
    validacionCelular() {
      return this.validar_condicion(this.usuario.celular.length > 0);
    },
    validacionCorreo() {
      return this.validar_condicion(this.usuario.correo.length > 0);
    },
    validacionRol() {
      return this.validar_condicion(this.usuario.rol.length > 0);
    },
    validacionClave() {
      return this.validar_condicion(this.usuario.clave.length > 0);
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

    mostrarUsuarios() {
      this.token = localStorage.getItem("token");
      axios
        .get(this.url + "usuarios", {
          headers: { token: this.token }
        })
        .then(response => {
          console.log(response.data.info);
          this.lista_usuarios = response.data.info;
          for (let i in this.lista_usuarios) {
            this.lista_usuarios[i].acciones = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    crearUsuario() {
      if (this.validacion) {
        axios
          .post(this.url + "usuarios", this.usuario, {
            headers: { token: this.token }
          })
          .then(response => {
            this.mostrarUsuarios();
            console.log(response);

            this.usuario = {
              tipo_documento: "",
              documento: "",
              nombre: "",
              apellidos: "",
              celular: "",
              correo: "",
              rol: 0,
              clave: ""
            };
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    },
    eliminarUsuario({ item }) {
      axios
        .delete(this.url + "usuarios/" + item.documento, {
          headers: { token: this.token }
        })
        .then(response => {
          let posicion = this.lista_usuarios.findIndex(
            lista_usuarios => lista_usuarios.documento == item.documento
          );
          this.lista_usuarios.splice(posicion, 1);
          alert("Usuario Eliminado");
        })
        .catch(error => {
          console.log(error);
        });
    },
    cargarUsuario({ item }) {
      this.validacion_actualizar = true;
      axios
        .get(`${this.url}usuarios/${item.documento}`, {
          headers: { token: this.token }
        })
        .then(response => {
          var datos = response.data.info;
          this.enEdicion = true;
          this.usuario.documento = datos[0].documento;
          this.usuario.nombre = datos[0].nombre;
          this.usuario.apellidos = datos[0].apellidos;
          this.usuario.edad = datos[0].edad;
          this.usuario.correo = datos[0].correo;
          this.usuario.celular = datos[0].celular;
          this.usuario.rol = datos[0].rol;
        })
        .catch(error => {
          console.log(error);
        });
    },
    actualizarUsuario() {
      if (this.validacion) {
        axios
          .put(`${this.url}usuarios/${this.usuario.documento}`, this.usuario, {
            headers: { token: this.token }
          })
          .then(response => {
            console.log(response);
            let position = this.lista_usuarios.findIndex(
              usuario => usuario.documento == this.usuario.documento
            );
            this.lista_usuarios.splice(position, 1, this.usuario);
            this.inEdition = false;
            this.usuario = {
              documento: "",
              nombre: "",
              apellidos: "",
              celular: "",
              correo: "",
              clave: ""
            };
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
