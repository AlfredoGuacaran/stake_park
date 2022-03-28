const pool = require('./db.js');

async function eliminarUsuarioDB(email) {
  try {
    const client = await pool.connect();
    const res = await client.query({
      text: 'delete from skaters where email = $1',
      values: [email],
    });
    client.release();
    return res.rowCount
      ? { ok: true }
      : { ok: false, error: 'Usuario no existe' };
  } catch (error) {
    return { ok: false, error: 'Usuario no existe' };
  }
}

module.exports = { eliminarUsuarioDB };
