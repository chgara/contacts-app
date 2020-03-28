const pool = require("./database");

async function getContacts(username) {
  const sql = "SELECT * FROM contactlist where username = ?";
  const rows = await pool.query(sql, username);
  return rows;
}
async function deleteContacts(id, username) {
  const sql = `DELETE FROM contactlist where id = ? and username = ?`;
  const rows = await pool.query(sql, [id, username]);
}
async function addContact(
  username,
  contactName,
  contactRelation,
  contactPhone
) {
  const sql =
    "INSERT INTO contactlist(contactName,contactRelation,contactPhone,username) VALUES(?,?,?,?)";
  const rows = await pool.query(sql, [
    contactName,
    contactRelation,
    contactPhone,
    username
  ]);
}
async function editContact(
  id,
  username,
  contactName,
  contactRelation,
  contactPhone
) {
  const sql =
    "UPDATE contactlist SET contactName = ?,contactRelation = ?, contactPhone = ? where id = ?  and username =?";
  const rows = await pool.query(sql, [
    contactName,
    contactRelation,
    contactPhone,
    id,
    username
  ]);
}
module.exports = { getContacts, deleteContacts, addContact, editContact };
