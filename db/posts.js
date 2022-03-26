const pool = require('./db.js');

async function crearUsuarioDB(
  email,
  nombre,
  passwordCrypt,
  anosExperiencia,
  especialidad,
  foto
) {
  try {
    const client = await pool.connect();
    const res = await client.query({
      text: 'insert into skaters (email, nombre, password ,anos_experiencia, especialidad,foto) values ($1,$2,$3,$4,$5,$6)',
      values: [
        email,
        nombre,
        passwordCrypt,
        anosExperiencia,
        especialidad,
        foto,
      ],
    });
    client.release();
    return res.rowCount
      ? { ok: true }
      : { ok: false, error: 'Email ya se encuentra registrado' };
  } catch (error) {
    return { ok: false, error: 'Email ya se encuentra registrado' };
  }
}

module.exports = { crearUsuarioDB };
