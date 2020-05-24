const express = require("express");
const router = express.Router();

const {
  actualizar_usuario,
  ver_usuario,
  ver_usuarios,
  guardar_usuario,
  eliminar_usuario,
  validar_usuario,
} = require("../controllers/usuarios");

router.get("/usuarios", (req, res) => {
  ver_usuarios()
    .then((answerDB) => {
      let records = answerDB.rows;
      res.send({
        ok: true,
        info: records,
        mensaje: "Usuarios consultados",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/usuarios/:id", (req, res) => {
  let info_usuario = req.params.id;
  ver_usuario(info_usuario)
    .then((answerDB) => {
      let records = answerDB.rows;
      res.send({
        ok: true,
        info: records,
        mensaje: "Usuario consultado",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/usuarios", (req, res) => {
  try {
    let info_usuario = req.body;
    validar_usuario(info_usuario);
    guardar_usuario(info_usuario)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "Usuario guardado",
          info: info_usuario,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/usuarios/:id", (req, res) => {
  try {
    let info_usuario = req.params.id;
    eliminar_usuario(info_usuario)
      .then((answerDB) => {
        res.send({
          ok: true,
          info: info_usuario,
          mensaje: "Usuario eliminado",
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});
router.put("/usuarios/:id", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let id = req.params.id;
    let info_usuario = req.body;

    // Actualiza el usuario en base de datos

    actualizar_usuario(info_usuario, id)
      .then((answerDB) => {
        res.send({ ok: true, mensaje: "Usuario editado", info: info_usuario });
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