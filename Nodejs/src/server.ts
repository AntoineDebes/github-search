import app from "./index";

const PORT = process.env.PORT || 9082;

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
