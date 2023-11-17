const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User must has a name']
    },
    email: {
        type: String,
        required: [true, 'User must has a email'],
        validat: [isEmail, 'Please enter valid email!'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is necessary'],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validat: {
            validator: function (pwd) {
                return pwd === this.password
            },
            message: 'Confirm Password always match with the Password'
        }
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)
module.exports = User