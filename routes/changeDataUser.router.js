const { Router } = require("express")
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require("config")
const router = Router()


router.post(
    '/changepass',
    [
        check('old_pass', 'Min length 6 simbols').isLength({ min: 6 }),
        check('new_pass', 'Min length 6 simbols').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Uncorectly data for change password'
                })
            }
            const { old_pass, new_pass, email } = req.body
            console.log(req.body)
            const user = await User.findOne({ email })

            console.log(user, email)


            const isMatch = await bcrypt.compare(old_pass, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Uncorrectly password' })
            }

            const hashPass = await bcrypt.hash(new_pass, 10)



            await user.updateOne({ password: hashPass })

            res.status(201).json({ message: 'Accept user password change' })

        } catch (e) {
            res.status(500).json({ message: 'Что-то не так' })
        }
    })

router.post(
    '/changeusername',
    [
        check('username', 'Min length 6 simbols').isLength({ min: 3 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Uncorectly data for change username'
                })
            }
            const { username, email } = req.body
            console.log(req.body)
            const user = await User.findOne({ email })

            console.log(user, email)

            await user.updateOne({ username })

            res.status(201).json({ message: 'Accept user username' })

        } catch (e) {
            res.status(500).json({ message: 'Что-то не так' })
        }
    })


module.exports = router