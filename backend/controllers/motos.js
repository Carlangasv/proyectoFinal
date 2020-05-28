const ServicePg = require("../services/postgres");

let validar_moto = (moto) => {
  if (!moto) {
    throw {
      ok: false,
      mensaje: "La información de la moto es obligatoria",
    };
  } else if (!moto.placa) {
    throw {
      ok: false,
      mensaje: "La placa es obligatoria",
    };
  }
};

let crear_moto = async (moto) => {
  let _service = new ServicePg();
  let sql = `INSERT INTO public.motos(
        placa, estado, clase, marca, modelo, color, cilindraje, id_propietario, nro_soat, vencimiento_soat, nro_tecnomecanica, 
        vencimiento_tecnomecanica)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
  let values = [
    moto.placa,
    moto.estado,
    moto.clase,
    moto.marca,
    moto.modelo,
    moto.color,
    moto.cilindraje,
    moto.id_propietario,
    moto.nro_soat,
    moto.vencimiento_soat,
    moto.nro_tecno,
    moto.vencimiento_tecno,
  ];
  let respuesta = await _service.runsql(sql, values);
  return respuesta;
};

let eliminar_moto = (placa) => {
  let _service = new ServicePg();
  let sql = `DELETE FROM public.motos where placa = '${placa}'`;
  let respuesta = _service.runsql(sql);
  return respuesta;
};

let ver_moto = async (placa) => {
  let _service = new ServicePg();
  let sql = `SELECT placa, estado, clase, marca, modelo, color, cilindraje, id_propietario, nro_soat, vencimiento_soat, nro_tecnomecanica, vencimiento_tecnomecanica
    FROM public.motos where placa = '${placa}'`;
  let respuesta = await _service.runsql(sql);
  return respuesta;
};

let ver_motos = async () => {
  let _service = new ServicePg();
  let sql = `SELECT placa, estado, clase, marca, modelo, color, cilindraje, id_propietario, nro_soat, vencimiento_soat, nro_tecnomecanica, vencimiento_tecnomecanica
    FROM public.motos`;
  let respuesta = await _service.runsql(sql);
  return respuesta;
};
let actualizar_moto = async (moto, placa) => {
  let _service = new ServicePg();
  let sql = `UPDATE public.motos
    SET  estado=$1, clase=$2, marca=$3, modelo=$4, color=$5, cilindraje=$6, id_propietario=$7, 
    nro_soat=$8, vencimiento_soat=$9, nro_tecnomecanica=$10, vencimiento_tecnomecanica=$11
    WHERE placa = $12`;
  let values = [
    moto.estado,
    moto.clase,
    moto.marca,
    moto.modelo,
    moto.color,
    moto.cilindraje,
    moto.id_propietario,
    moto.nro_soat,
    moto.vencimiento_soat,
    moto.nro_tecno,
    moto.vencimiento_tecno,
    placa,
  ];
  let respuesta = _service.runsql(sql, values);
  return respuesta;
};
module.exports = {
  ver_motos,
  ver_moto,
  eliminar_moto,
  crear_moto,
  actualizar_moto,
  validar_moto,
};
