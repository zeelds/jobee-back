const express = require('express')
const ArticleController = require('../../controllers/ArticleController')
const UserController = require('../../controllers/UserController')
const router = express()

router.post('/', async (req, res) => {

    if(!req.body.searchTerms) return res.json({})

    const searchTerms = req.body.searchTerms

    const allUsers = await UserController.safelyGetAllUsers()
    const allArticles = await ArticleController.safelyGetAllArticles()

    const filteredUsers = await Promise.all(
        allUsers.filter((elem) => {
            if (searchTerms.some(term => JSON.stringify(elem).toLowerCase().includes(term.toLowerCase()))) {
                return true
            } else {
                return false
            }
        })
    )
    
    const filteredArticles = await Promise.all(
        allArticles.filter((elem) => {
            if (searchTerms.some(term => JSON.stringify(elem).includes(term))) {
                return true
            } else {
                return false
            }
        })
    )

    return res.json({ filteredUsers, filteredArticles })

})

module.exports = router