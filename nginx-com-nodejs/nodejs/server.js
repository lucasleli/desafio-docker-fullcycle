const express = require('express')
const mysql = require('mysql')
const app = express();
const port = 3000

const config = {
  host: 'dbfullcycle',
  user: 'root',
  password: 'root',
  database: 'testfullcycle'
};

const connection = mysql.createConnection(config);

connection.query(`
CREATE TABLE IF NOT EXISTS people (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
)`);

function queryAsync(sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
}

app.get('/', async (req, res) => {
  try {
    await queryAsync(`INSERT INTO people (nome) VALUES ('Lucas')`);
    const people = await queryAsync(`SELECT nome FROM people`);

    let html = '<h1>Full Cycle Rocks!</h1>';
    html += '<ul>';
    people.forEach(person => {
      html += `<li>${person.nome}</li>`;
    });
    html += '</ul>';

    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao processar a requisição');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});