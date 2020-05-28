const ServicePg = require("../services/postgres");

let validar_usuario = (usuario) => {
  if (!usuario) {
    throw {
      ok: false,
      mensaje: "Los datos son obligatorios",
    };
  } else if (!usuario.documento){
    throw {
      ok: false,
      mensaje: "El documento es obligatorio",
      data:usuario
    };
  } else if (!usuario.rol) {
    throw {
      ok: false,
      mensaje: "El rol es obligatorio",
    };
  }
};

let guardar_usuario = async (usuario) => {
  let _service = new ServicePg();
  let sql = `INSERT INTO public.usuarios(
        tipo_documento, documento, nombre, apellidos, celular, correo, rol, clave)
        VALUES ($1, $2, $3, $4, $5, $6, $7, md5($8))`;
  let values = [
    usuario.tipo_documento,
    usuario.documento,
    usuario.nombre,
    usuario.apellidos,
    usuario.celular,
    usuario.correo,
    usuario.rol,
    usuario.clave,
  ];
  let respuesta = _service.runsql(sql, values);
  return respuesta;
};

let eliminar_usuario = (usuario) => {
  let _service = new ServicePg();
  let sql = `DELETE FROM public.usuarios where documento = '${usuario}'`;
  let respuesta = _service.runsql(sql);
  return respuesta;
};

let actualizar_usuario = async (usuario, documento) => {
  let _service = new ServicePg();
  let sql = `UPDATE public.usuarios
	SET nombre=$1, apellidos=$2, celular=$3, correo=$4, rol=$5, clave=md5($6)
    WHERE documento = $7`;
  let values = [
    usuario.nombre,
    usuario.apellidos,
    usuario.celular,
    usuario.correo,
    usuario.rol,
    usuario.clave,
    documento,
  ];
  let respuesta = await _service.runsql(sql,values);
  return respuesta;
};

let ver_usuarios = async ()=>{
    let _service = new ServicePg();
    let sql = `SELECT tipo_documento, documento, nombre, apellidos, celular, correo, rol
    FROM public.usuarios;`
    let respuesta = await _service.runsql(sql)
    return respuesta 
}

let ver_usuario = async (documento) =>{
    let _service = new ServicePg();
    let sql = `SELECT * FROM public.usuarios WHERE documento = '${documento}'`;
    let respuesta = await _service.runsql(sql);
    return respuesta;
}

module.exports = {
    actualizar_usuario,
    ver_usuario,
    ver_usuarios,
    guardar_usuario,
    eliminar_usuario,
    validar_usuario
}