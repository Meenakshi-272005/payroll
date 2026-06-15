const express = require("express");
const session = require("express-session");
const { RedisStore } = require("connect-redis");
const redisClient = require("./config/redis");
const cors = require("cors");
const statutoryRoutes = require('./routes/statutory.routes');
const taxSlabRoutes = require('./routes/tax-slab.routes');
const pfConfigRoutes = require('./routes/pf-config.routes');
const esiConfigRoutes = require('./routes/esi-config.routes');
const ptConfigRoutes = require('./routes/pt-config.routes');
const healthRoutes = require('./routes/health');

const app = express();

// ============ MIDDLEWARE ============
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(
  session({
    store: new RedisStore({
      client: redisClient,
      prefix: "sess:"
    }),
    secret: process.env.SESSION_SECRET || "your-secret-key-change-this",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60
    }
  })
);

// ============ ROUTES (MUST BE BEFORE 404 HANDLER) ============

// Home route
app.get("/", (req, res) => {
  res.json({ 
    message: "Payroll Backend API", 
    status: "running",
    module: "Module 2 - Statutory & Compliance"
  });
});

// Health check route - MOVED HERE BEFORE 404
app.use('/api', healthRoutes);


// Module 1 Routes (from your friend)
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/org", require("./routes/org.routes"));


// ✅ ADD ALL MODULE-2 ROUTES
app.use("/api/statutory", statutoryRoutes);
app.use("/api/tax-slabs", taxSlabRoutes); 
app.use("/api/pf-config", pfConfigRoutes);
app.use("/api/esi-config", esiConfigRoutes);
app.use("/api/pt-config", ptConfigRoutes);



// ============ ERROR HANDLERS (MUST BE LAST) ============

// 404 handler - MUST BE AFTER ALL ROUTES
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler - MUST BE LAST
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ 
    message: "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;