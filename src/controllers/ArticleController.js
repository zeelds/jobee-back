
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

        return {message: createdArticle, status: 200}

    },
    
    async getArticle(id){

        const foundArticle = await Article.findOne({where: {id: id}})

        return {message: foundArticle, status: 200}

    },

    async getAllArticles(author_id){

        const foundArticle = await Article.findAll({where: {author_id: author_id}})

        return {message: foundArticle, status: 200}

    },

    async updateArticle(id, title, content, status, tags){

        const newArticle = await Article.update({
            title: title,
            content: content,
            status: status,
            tags: tags
        },{
            where: {id: id}
        })

        return {message: newArticle, status: 200}

    },

    async deleteArticle(id){

        const removedArticle = await Article.destroy({where: {id: id}})

        return {message: removedArticle, status: 200}

    },

    async createComment(content,author_id,article_id){

        const createdComment = await Comment.create({
            content: content,
            author_id: author_id,
            article_id: article_id
        })

        return {message: createdComment, status: 200}

    },
    
    async getComment(id){

        const foundComment = await Comment.findOne({where:{id: id}})

        return {message: foundComment, status: 200}

    },

    async getAllArticleComment(article_id){

        const foundComments = await Comment.findAll({where:{article_id: article_id}})

        return {message: foundComments, status: 200}

    },

    async getAllUserComments(author_id){

        const foundComments = await Comment.findAll({where:{author_id: author_id}})

        return {message: foundComments, status: 200}

    },

    async updateComment(id, content){

        const newComment = await Comment.update({
            content: content
        },{where:{id: id}})

        return {message: newComment, status: 200}

    },

    async deleteComment(id){

        const removedComment = await Comment.destroy({where: {id: id}})

        return {message: removedComment, status: 200}

    },

}