const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: String,
    place: String, // local da fota
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0
    }
},{
    timestamps: true, // cria um campo para cada registro que armazena a data de criação do registro e a data de ultima atualização desse registro
});

module.exports = mongoose.model('Post', PostSchema);