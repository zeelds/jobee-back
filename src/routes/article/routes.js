const express = require('express');
const ArticleController = require('../../controllers/ArticleController');
const { verifyJWT } = require('../client/functions');
const router = express.Router();

router.post('/', (req,res) => {
    return res.json('teste')
})

router.post('/create-article', verifyJWT, async (req,res) => {

    //if user é premium, pode colocar textos maiores, se n vai dar erro se tiver mt longo
    
    const {title,content,status,tags} = req.body
    const user_id = req.body.user_id

    const newArticle = await ArticleController.createArticle(title,content,status,tags,user_id)

    return res.json({data: newArticle, message: 'Artigo criado com sucesso!', status: 200})
})

router.post('/update-article', verifyJWT, async (req,res) => {

    //if user é premium, pode editar o texto do artigo, se n, n vai rolar
    
    const {id,title,content,status,tags} = req.body
    const user_id = req.body.user_id

    const updatedArticle = await ArticleController.updateArticle(id,title,content,status,tags,user_id)

    return res.json({data: updatedArticle, message: 'Artigo atualizado com sucesso!', status: 200})
})

router.post('/delete-article', verifyJWT, async (req,res) => {
    
    const {id} = req.body
    const user_id = req.body.user_id

    const removedArticle = await ArticleController.deleteArticle(id, user_id)

    return res.json({data: removedArticle, message: 'Artigo deletado com sucesso!', status: 200})

})

router.get('/article/:id', async (req,res) => {
    
    const id = req.params.id

    const foundArticle = await ArticleController.getArticle(id)

    return res.json({data: foundArticle, message: 'Artigo encontrado com sucesso!', status: 200})

})

router.get('/articles-list/:user_id', async (req,res) => {
    
    const user_id = req.params.user_id

    const newArticle = await ArticleController.getAllArticles(user_id)

    return res.json({data: newArticle, message: 'Artigos encontrados com sucesso!', status: 200})

})

router.get('/article-comments-list/:article_id', async (req,res) => {

    const article_id = req.params.article_id

    const newArticle = await ArticleController.getAllArticleComments(article_id)

    return res.json({data: newArticle, message: 'Comentários encontrados com sucesso!', status: 200})

})

router.get('/user-comments-list/:user_id', async (req,res) => {

    const user_id = req.params.user_id

    const newArticle = await ArticleController.getAllUserComments(user_id)

    return res.json({data: newArticle, message: 'Comentários encontrados com sucesso!', status: 200})

})

router.post('/create-comment', verifyJWT, async (req,res) => {
    
    const {content,article_id} = req.body
    const author_id = req.body.user_id

    const newComment = await ArticleController.createComment(content,author_id,article_id)

    return res.json({data: newComment, message: 'Comentário criado com sucesso!', status: 200})

})

router.post('/update-comment', verifyJWT, async (req,res) => {
    
    const {id,content} = req.body
    const user_id = req.body.user_id

    const updatedComment = await ArticleController.updateComment(id, content, user_id)

    return res.json({data: updatedComment, message: 'Comentário atualizado com sucesso!', status: 200})
})

router.post('/delete-comment', verifyJWT, async (req,res) => {
    
    const {id} = req.body
    const author_id = req.body.user_id

    const removedComment = await ArticleController.deleteComment(id, author_id)

    return res.json({data: removedComment, message: 'Comentário deletado com sucesso!', status: 200})

})

router.get('/comment/:id', async (req,res) => {

    //if user é premium, pode editar o texto do comentario, se n, n vai rolar
    
    const id = req.params.id

    const foundComment = await ArticleController.getComment(id)

    return res.json({data: foundComment, message: 'Comentário encontrado com sucesso!', status: 200})

})

module.exports = router