import app from "./app";

const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
