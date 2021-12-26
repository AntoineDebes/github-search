import app from "./index";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
