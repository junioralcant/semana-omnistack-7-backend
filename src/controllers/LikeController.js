const Post = require('../models/Post');

class LikeController {

    async store(req, resp){
        const post = await Post.findById(req.params.id); // recupera o oposter infomado 

        post.likes += 1; // acrescenta um like

        await post.save();

        req.io.emit('like', post); // envia para todos os usuario que estão connectados na aplicação que tem um novo like. 

        return resp.json(post);
    }
}

module.exports = new LikeController();