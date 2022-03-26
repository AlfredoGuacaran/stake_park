const pool = require('./db.js');

async function getUsuariosDB() {
  try {
    const client = await pool.connect();
    const res = await client.query({
      text: 'select * from skaters',
    });
    client.release();
    const usuarios = res.rows;
    return res.rowCount
      ? usuarios
      : { ok: false, error: 'Error al obtener usuarios' };
  } catch (error) {
    return { ok: false, error: 'Error al obtener usuarios' };
  }
}
async function getUsuarioDB(email) {
  try {
    const client = await pool.connect();
    const res = await client.query({
      text: 'select * from skaters where email = $1',
      values: [email],
    });
    client.release();
    const usuario = res.rows[0];
    return res.rowCount
      ? { ok: true, usuario: usuario }
      : { ok: false, error: 'Usuario no existe' };
  } catch (error) {
    return { ok: false, error: 'Error al obtener usuario' };
  }
}

module.exports = { getUsuariosDB, getUsuarioDB };
