const Post = require('../models/Post');
const sharp = require('sharp'); 
const path = require('path'); // depedecia do proprio node
const fs = require('fs'); // depedecia do proprio node 



class PostController {

    async index(req, resp) {
        const posts = await Post.find().sort('-createdAt');

        return resp.json(posts)
    }

    async store(req, resp){
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file; // recupera o filename do req.file e o remomeia para image
        
        const [name, ext] = image.split('.'); //separa a varialvel image em duas, name qua guada tudo que vem antes do ponto e ext tudo oque vem depois 
        const fileName = `${name}.jpg`; // dessa foma independe da extenção da img ela sera salva com a extenção jpg 
        // faz o redimensionamento da imagem para ficar todas em um tamanho agradavel
        await sharp(req.file.path)
            .resize(500)// tamanho de 500ps
            .jpeg({ quality: 70 })// converte as img para o formato jpeg e diminue a qualidade para 70%
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName) // salva a imagem redimesionada n pasta resized    
            )

            fs.unlinkSync(req.file.path); // exclue a img original e deixa somente a redimencionada

        const post =  await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName
        });

        req.io.emit('post', post); // envia para todos os usuario que estão connectados a aplicação uma informação que um novo post foi criado. nome do post (poderiaser qualquer um) e os dados que sera enviado 

        return resp.json(post);
    }
}

module.exports = new PostController();