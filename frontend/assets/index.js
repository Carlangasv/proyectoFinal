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
  //Aquí se validan todos los campos
  computed: {
    validar_id() {
      return this.usuario.documento.length > 0;
    },

    validar_clave() {
      return this.usuario.clave.length > 0;
    }
  },
  methods: {
    /**
     * Metodo para logearse usando jwt
     */
    login() {
      let url = this.url + "login";
      if (this.usuario.documento.length > 0 && this.usuario.clave.length > 0) {
        axios
          .post(url, this.usuario)
          .then(response => {
            let data = response.data;
            console.log("Data:", data);
            //Se guardan los valores de interes en el localStorage
            localStorage.setItem("token", data.info);
            localStorage.setItem("documento", this.usuario.documento);
            localStorage.setItem("rol", data.rol);
            //Se va a ruta de /home
            this.$router.push("/home");
          })
          .catch(error => {
            alert("Documento o clave incorrecto");
            console.log(error);
          });
      } else {
        alert("Llene todos los campos");
      }
    }
  }
};
