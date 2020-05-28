const express = require("express");
const router = express.Router();
const {
  actualizar_mantenimiento,
  ver_mantenimientos,
  ver_mantenimiento,
  validar_mantenimiento,
  eliminar_mantenimiento,
  crear_mantenimiento,
} = require("../controllers/mantenimientos");

router.get("/mantenimientos", (req, res) => {
  ver_mantenimientos()
    .then((answerDB) => {
      let records = answerDB.rows;
      res.send({
        ok: true,
        info: records,
        mensaje: "Mantenimientos consultados",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/mantenimientos/:placa/:id_mecanico/:fecha", (req, res) => {
  let placa = req.params.placa;
  let id_mecanico = req.params.id_mecanico;
  let fecha = req.params.fecha
  ver_mantenimiento(placa,id_mecanico,fecha)
    .then((answerDB) => {
      res.send({
        ok: true,
        info: answerDB.rows,
        mensaje: "mantenimiento consultada",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/mantenimientos", (req, res) => {
  try {
    let info_mantenimiento = req.body;
    validar_mantenimiento(info_mantenimiento);
    crear_mantenimiento(info_mantenimiento)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "Mantenimiento guardado",
          info: info_mantenimiento,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/mantenimientos/:placa/:id_mecanico/:fecha", (req, res) => {
  try {
    let placa = req.params.placa;
    let id_mecanico = req.params.id_mecanico;
    let fecha = req.params.fecha;
    eliminar_mantenimiento(id_mecanico,placa,fecha)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "Mantenimiento eliminada",
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

router.put("/mantenimientos/:placa/:id_mecanico/:fecha", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let placa = req.params.placa;
    let id_mecanico = req.params.id_mecanico;
    let fecha = req.params.fecha;
    let info_mantenimiento = req.body;
    actualizar_mantenimiento(info_mantenimiento,id_mecanico,placa,fecha)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "Mantenimiento editado",
          info: info_usuario,
        });
      })
      .catch((error) => {
        res.send(error);
      });

    // Responder
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
