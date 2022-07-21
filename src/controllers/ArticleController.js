
const Article = require("../models/Article")
const Comment = require("../models/Comment")

module.exports = {

    async createArticle(title,content,status,tags,author_id){

        const createdArticle = await Article.create({
            title: title,
            content: content,
            status: status,
            tags: tags,
            author_id: author_id
        })

        return {data: createdArticle, message: 'Artigo criado com sucesso!', status: 200}

    },
    
    async getArticle(id){

        const foundArticle = await Article.findOne({where: {id: id}})

        return {data: foundArticle, message: 'Busca finalizada com sucesso!', status: 200}

    },

    async getAllArticles(author_id){

        const foundArticle = await Article.findAll({where: {author_id: author_id}, order: [['created_at', 'desc']]})

        return {data: foundArticle, message: 'Busca finalizada com sucesso!', status: 200}

    },

    async updateArticle(id, title, content, status, tags, user_id){

        const newArticle = await Article.update({
            title: title,
            content: content,
            status: status,
            tags: tags
        },{
            where: {id: id, user_id: user_id}
        })

        return {data: newArticle, message: 'Artigo atualizado com sucesso!', status: 200}

    },

    async deleteArticle(id, user_id){

        const removedArticle = await Article.destroy({where: {id: id, user_id: user_id}})

        return {data: removedArticle, message: 'Artigo excluído com sucesso!', status: 200}

    },

    async createComment(content,author_id,article_id){

        const createdComment = await Comment.create({
            content: content,
            author_id: author_id,
            article_id: article_id
        })

        return {data: createdComment, message: 'Comentário criado com sucesso!', status: 200}

    },
    
    async getComment(id){

        const foundComment = await Comment.findOne({where:{id: id}})

        return {data: foundComment, message: 'Busca finalizada com sucesso', status: 200}

    },

    async getAllArticleComments(article_id){

        const foundComments = await Comment.findAll({where:{article_id: article_id}})

        return {data: foundComments, message: 'Busca finalizada com sucesso!', status: 200}

    },

    async getAllUserComments(author_id){

        const foundComments = await Comment.findAll({where:{author_id: author_id}})

        return {data: foundComments, message: 'Busca finalizada com sucesso!', status: 200}

    },

    async updateComment(id, content, user_id){

        const newComment = await Comment.update({
            content: content
        },{where:{id: id, author_id: user_id}})

        return {data: newComment, message: 'Comentário atualizado com sucesso!', status: 200}

    },

    async deleteComment(id, user_id){

        const removedComment = await Comment.destroy({where: {id: id, author_id: user_id}})

        return {data: removedComment, message: 'Comentário deletado com sucesso!', status: 200}

    },

}