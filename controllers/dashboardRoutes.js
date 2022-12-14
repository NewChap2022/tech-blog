const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const secondAuth = require('../utils/secondAuth');

router.get('/', withAuth, (req, res) => {
    const dbPostData = 
        Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]           
    })
    
    const dbCommentData = 
        Comment.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'comment_text',
            'created_at',
            'post_id'
        ],
        include: {
            model: Post,
            attributes: ['title']
        }
    });

    Promise.all([dbPostData, dbCommentData])
        .then(dbData => {
            const posts = dbData[0].map(post => post.get({ plain: true }));
            const comments = dbData[1].map(comment => comment.get({ plain: true }));
            res.render('dashboard', { posts, comments, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/post/add', secondAuth, (req, res) => {
    if(req.session.loggedIn) {
        res.render('addpost', { loggedIn: req.session.loggedIn });
    } else {
        res.redirect('/');
    }
});

router.get('/edit/post/:id', secondAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
            'user_id'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const post = dbPostData.get({ plain: true });
            if (req.session.user_id === post.user_id) {
                res.render('editpost', { post, loggedIn: true });
            } else {
                res.redirect('/dashboard')
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/comment/:id', secondAuth, (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'comment_text',
            'user_id'
        ],
    })
        .then(dbCommentData => {
            const comment = dbCommentData.get({ plain: true });
            if (req.session.user_id === comment.user_id) {
                res.render('editcomment', { comment, loggedIn: true });
            } else {
                res.redirect('/dashboard')
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;