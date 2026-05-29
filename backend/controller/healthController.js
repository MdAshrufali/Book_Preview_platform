const { testConnection } = require('../config/db');

const healthController = {
  getHealth: (req, res) => {
    res.json({ ok: true, service: 'crt-backend' });
  },

  dbTest: async (req, res) => {
    const rows = await testConnection();
    res.json({ ok: true, db: rows?.[0] ?? null });
  },
};

module.exports = { healthController };

