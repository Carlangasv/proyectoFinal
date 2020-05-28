const express = require("express");
const router = express.Router();
const {
  ver_motos,
  ver_moto,
  eliminar_moto,
  crear_moto,
  actualizar_moto,
  validar_moto,
} = require("../controllers/motos");

router.get("/motos", (req, res) => {
  ver_motos()
    .then((answerDB) => {
      let records = answerDB.rows;
      res.send({
        ok: true,
        info: records,
        mensaje: "Motos consultadas",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/motos/:placa", (req, res) => {
  let info_moto = req.params.placa;
  ver_moto(info_moto)
    .then((answerDB) => {
      res.send({
        ok: true,
        info: answerDB.rows,
        mensaje: "Moto consultada",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/motos", (req, res) => {
  try {
    let info_moto = req.body;
    validar_moto(info_moto);
    crear_moto(info_moto)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "Usuario guardado",
          info: info_moto,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/motos/:placa", (req, res) => {
  try {
    let info_moto = req.params.placa;
    eliminar_moto(info_moto)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "Moto eliminada",
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

router.put("/motos/:placa", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let id = req.params.placa;
    let info_moto = req.body;

    // Actualiza el usuario en base de datos

    actualizar_moto(info_usuario, id)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "Moto editada",
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