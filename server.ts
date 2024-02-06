import app from "./app";

const port = process.env.PORT || 8800;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

process.on('SIGINT', async () => {
  console.log('Closing server...');
  server.close(() => {
      console.log('Server closed');
      process.exit(0);
  });
});
