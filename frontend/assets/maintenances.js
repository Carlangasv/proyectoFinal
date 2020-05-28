import axios from "axios";

export default {
  data() {
    return {
      message: "crud mantenimientos",
      enEdicion: false,
      showTable: true,
      validacion: "",
      mantenimientos: {
        id_mecanico: "",
        placa: "",
        fecha: "",
        trabajos_realizados: "",
        horas_invertidas: "",
        acciones: true
      }
    };
  },
  created() {},
  computed: {
    validacionId_mecanico() {
      return this.validar_condicion(this.mantenimientos.id_mecanico.length > 0);
    },
    validacionPlaca() {
      return this.validar_condicion(this.mantenimientos.placa.length > 0);
    },
    validacionFecha() {
      return this.validar_condicion(this.mantenimientos.fecha.length > 0);
    },
    validacionTrabajos_realizados() {
      return this.validar_condicion(
        this.mantenimientos.trabajos_realizados.length > 0
      );
    },
    validacionHoras_invertidas() {
      return this.validar_condicion(
        this.mantenimientos.horas_invertidas.length > 0
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
    }
  }
};
