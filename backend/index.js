// Importar express
const express = require("express");
const cors = require("cors");

// Inicializar la librería
const app = express();
app.use(express.json());
app.use(cors());
// VERSION del api
const vs = "/api/v1/";

const route_login = require("./routes/authentication");
const route_users = require("./routes/usuarios"); 


app.use(vs, route_login);
app.use(vs,route_users);

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
    `Escuchando API en http://localhost:${port} en el modo ${process.env.MODE}`
  );
});
