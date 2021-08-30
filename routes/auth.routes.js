const { Router } = require("express")
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require("config")
const router = Router()


router.post(
    '/register',
    [
        check('email', 'Uncorrectly email').isEmail(),
        check('password', 'Min length 6 simbols').isLength({min:6})
    ],
async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Uncorectly data for registration'
            })
        }
        const {email, password} = req.body

        const condidat = await User.findOne({ email })

        if (condidat){
            res.status(400).json({message: 'User has be auth'})
        }

        const hashPass = await bcrypt.hash(password, 10)
        const user = new User({email, password: hashPass})

        await user.save()

        res.status(201).json({message: 'Accept user auth'})

    } catch(e) {
        res.status(500).json({message : 'Что-то не так'})
    }
})


router.post(
    '/login',
    [
        check('email', 'Set correct email').normalizeEmail().isEmail(),
        check('password', 'Set password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Uncorectly data for auth'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user){
                return res.status(400).json({message: 'User not found'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch){
                return res.status(400).json({message: 'Uncorrectly password'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                {expiresIn: '1000h'}
            )

            res.json({token, userId: user.id})
    
        } catch(e) {
            res.status(500).json({message : 'Что-то не так'})
        }
})


router.post(
    '/login',
    [
        check('email', 'Set correct email').normalizeEmail().isEmail(),
        check('password', 'Set password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Uncorectly data for auth'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})
            

            if (!user){
                return res.status(400).json({message: 'User not found'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch){
                return res.status(400).json({message: 'Uncorrectly password'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})
    
        } catch(e) {
            res.status(500).json({message : 'Что-то не так'})
        }
})

module.exports = router