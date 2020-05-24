// Importar express
const express = require("express");
const cors = require("cors");

// Inicializar la librería
const app = express();
app.use(express.json());
app.use(cors());
// VERSION del api
const vs = "/api/v1/";

const route_login = require("./routes/autenticacion");
const route_users = require("./routes/usuarios"); 
const route_motos = require("./routes/motos")


app.use(vs, route_login);
app.use(vs,route_users);
app.use(vs,route_motos)

app.use("/", (req, res) => {
  res.status(404).send({
    ok: false,
    message: "El recurso que busca no existe",
  });
});

// Puerto
const port = 3001;
app.listen(port, () => {
  console.log(
    `Escuchando API en http://localhost:${port}/api/v1`
  );
});
