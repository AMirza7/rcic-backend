// src/server.ts
import app from './app';

const port = Number(process.env.PORT) || 5100;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// import dotenv from 'dotenv';
// dotenv.config();

// import app from './app';
// import { sequelize, initModels } from './models';

// const PORT = process.env.PORT ? Number(process.env.PORT) : 5100;

// async function start() {
//   try {
//     // 1) Test DB connection
//     await sequelize.authenticate();
//     console.log('✅ Database connection established');

//     // 2) Initialize all models & associations
//     initModels();
//     console.log('✅ Models initialized');

//     // 3) (Optional) Run pending migrations instead of sync() if you prefer:
//     // await sequelize.sync(); 

//     // 4) Start HTTP server
//     app.listen(PORT, () => {
//       console.log(`🚀 Server listening on http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error('❌ Failed to start server:', err);
//     process.exit(1);
//   }
// }

// start();
