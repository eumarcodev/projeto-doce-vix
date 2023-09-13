import app from ".";

app
  .listen(3000, () => {
    console.log("Server is listening on port 3000");
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  })
  .on("close", () => {
    console.log("Server closed");
    process.exit(0);
  });
