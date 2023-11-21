const crypto = require('crypto')
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
        validate: [isEmail, 'Please enter valid email!'],
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
        validate: {
            validator: function (pwd) {
                return pwd === this.password
            },
            message: 'Confirm Password always match with the Password'
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
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

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) next();

    this.passwordChangedAt = Date.now() - 1000;
    next()
})

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } })
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

    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model('User', userSchema)
module.exports = User