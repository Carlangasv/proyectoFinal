import axios from "axios";

export default {
  beforeMount() {},
  data() {
    return {
      url: "http://localhost:3001/api/v1/",
      message: "INICIAR SESIÓN",
      usuario: {  
        documento: "",
        clave: ""
      }
    };
  },
  computed: {
    validar_id() {
      return this.usuario.documento.length > 0;
    },

    validar_clave() {
      return this.usuario.clave.length > 0;
    }
  },
  methods: {
    login() {
      let url = this.url + "login";
      if (this.usuario.documento.length > 0 && this.usuario.clave.length > 0) {
        axios
          .post(url, this.usuario)
          .then(response => {
            let data = response.data;
            console.log("Data:", data);
            localStorage.setItem("token", data.info);
            localStorage.setItem("documento", this.usuario.documento);
            localStorage.setItem("rol", data.rol);
            this.$router.push("/home");
          })
          .catch(error => {
            alert("Documento o clave incorrecto");
            console.log(error);
          });
      } else {
        alert("Llene todos los campos");
      }
      let arreglo = [
        {
          nombre: "",
          url: "/admin"
        }
      ];
    }
  }
};
