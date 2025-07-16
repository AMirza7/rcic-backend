import app from './app';

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
