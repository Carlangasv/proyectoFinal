const express = require("express");
const router = express.Router();
const _controller = require("../controllers/autenticacion");

router.use((req, res, next) => {
  try {
    let url = req.url;
    if (url == "/login") {
      next();
    } else {
      let token = req.headers.tokenM;
      let verify = _controller.validar_token(token);
      next();
    }
  } catch (error) {
    res.status(401).send({
      ok: false,
      info: error,
      mensaje: "No autenticado",
    });
  }
});

router.get("/verificar", (req, res) => {
  try {
    let token = req.headers.token;

    let verificacion = _controlador.verificarToken(token);
    res.status(200).send({
      ok: true,
      info: verificacion,
      mensaje: "Autenticado.",
    });
  } catch (error) {
    res.status(401).send({
      ok: false,
      info: error,
      mensaje: "No Autenticado.",
    });
  }
});
router.post("/verify", (req, res) => {
  try {
    let body = req.body;
    _controller.validar_datos(body);
    _controller
      .consultar_usuario(body)
      .then((respuestaDB) => {
        let persona =
          respuestaDB.rowCount > 0 ? respuestaDB.rows[0] : undefined;
        if (persona) {
          let token = _controlador.generarToken(persona);
          res
            .status(200)
            .send({
              ok: true,
              info: token,
              mensaje: "Persona autenticada.",
              rol: persona.rol,
            });
        } else {
          res.status(400).send({
            ok: false,
            info: {},
            mensaje: "Documento y/o clave incorrecta.",
          });
        }
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
