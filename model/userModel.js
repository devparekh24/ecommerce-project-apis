const { randomInt } = require('crypto')
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

userSchema.pre('save', async function (next) {

    //if password is actually modified this fn will run 
    if (!this.isModified('password')) return next();

    //hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //delete the confirmpassword field
    this.confirmPassword = undefined;
    next();
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {

        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)

        console.log(changedTimeStamp, JWTTimestamp)
        return changedTimeStamp > JWTTimestamp;
    }
    return false;
}

userSchema.methods.resetTokenForCreatePassword = function () {

    // otp generation
    const resetToken = randomInt(0, 1000000).toString()
    this.passwordResetToken = resetToken
    this.passwordResetExpires = Date.now() + 5 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model('User', userSchema)
module.exports = User