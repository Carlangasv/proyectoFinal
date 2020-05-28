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

router.get("/mantenimientos/:placa", (req, res) => {
  let info_mantenimiento = req.params.placa;
  ver_mantenimiento(info_mantenimiento)
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
          mensaje: "Usuario guardado",
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

router.delete("/mantenimientos/:placa", (req, res) => {
  try {
    let info_mantenimiento = req.params.placa;
    eliminar_mantenimiento(info_mantenimiento)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "mantenimiento eliminada",
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

router.put("/mantenimientos/:placa", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let id = req.params.placa;
    let info_mantemiento = req.body;

    // Actualiza el usuario en base de datos

    actualizar_mantenimiento(info_mantenimiento, id)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "mantenimiento editado",
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
