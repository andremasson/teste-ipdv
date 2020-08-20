const express = require("express");
const db = require("./config/db");

const app = express();

app.use(express.json({extended: false}));

app.use("/api/centro_de_custos", require("./routes/api/centro_de_custos"));
app.use("/api/cargos", require("./routes/api/cargos"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App iniciado na porta ${PORT}`));
