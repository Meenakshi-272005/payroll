require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ibm_module2';

// ============ DATABASE CONNECTION ============
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log(`📦 Database: ${mongoose.connection.name}`);
    
    // ============ START SERVER ONLY AFTER DB CONNECTS ============
    const server = app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║  🚀 Payroll Backend Server Started     ║
║  📍 Port: ${PORT}                       ║
║  📦 Module: Module 2 - Statutory       ║
║  🗄️  Database: ${mongoose.connection.name}          ║
║  🌐 Frontend: http://localhost:5173    ║
║  🔌 Backend: http://localhost:${PORT}    ║
║  📡 API: http://localhost:${PORT}/api   ║
╚════════════════════════════════════════╝
      `);
    });

    // ============ GRACEFUL SHUTDOWN ============
    process.on('SIGTERM', () => {
      console.log('⚠️  SIGTERM received, shutting down gracefully...');
      server.close(() => {
        mongoose.connection.close(() => {
          console.log('✅ MongoDB connection closed');
          console.log('✅ Server closed');
          process.exit(0);
        });
      });
    });

    process.on('SIGINT', () => {
      console.log('⚠️  SIGINT received, shutting down gracefully...');
      server.close(() => {
        mongoose.connection.close(() => {
          console.log('✅ MongoDB connection closed');
          console.log('✅ Server closed');
          process.exit(0);
        });
      });
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Make sure MongoDB is running: mongod');
    console.error('Also make sure folder C:\\data\\db exists');
    process.exit(1);
  });

// ============ HANDLE UNHANDLED REJECTIONS ============
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// ============ HANDLE UNCAUGHT EXCEPTIONS ============
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});
