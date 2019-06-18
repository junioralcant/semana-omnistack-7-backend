const multer = require('multer');
const path = require('path'); // o path ja é nativo do node, ou seja, não é preciso instalalo
const crypto = require('crypto');

module.exports = {
    // configura o upload de imagens para que elas sejam salvas dentro do nosso projeto
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'), // local onde as imagens seram armazenadas
        filename: (req, file, cb) => { // conf o nome do arquivo
            crypto.randomBytes(16, (err, raw)=> { // 16 bytes de caracteres aleatórios, para gerar caracteres aleratórios nos nomes dos aquivos, isso possibilita que os nomes dos arquivos não se repita
                if(err) return cb(err);

                cb(null, raw.toString('hex') + path.extname(file.originalname));  // concatena os caracteres gerados com o nome original do arquivo
            });
        }
    })
}