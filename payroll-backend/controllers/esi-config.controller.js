const ESIConfig = require("../models/ESIConfig");

exports.createESIConfig = async (req, res) => {
  try {
    const config = new ESIConfig(req.body);
    await config.save();

    res.status(201).json({
      success: true,
      message: "ESI configuration created successfully",
      data: config
    });
  } catch (error) {
    console.error("ESI ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};