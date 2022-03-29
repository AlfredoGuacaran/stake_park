const pool = require('./db.js');

async function validarUsuarioDB(id, auth) {
  try {
    const client = await pool.connect();
    const res = await client.query({
      text: 'update skaters set estado=$2 where id=$1',
      values: [id, auth],
    });
    client.release();
    return res.rowCount
      ? { ok: true }
      : { ok: false, error: 'Error al aurotizar' };
  } catch (error) {
    return { ok: false, error: 'Error al aurotizar' };
  }
}

module.exports = { validarUsuarioDB };
