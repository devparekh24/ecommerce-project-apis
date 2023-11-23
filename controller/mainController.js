const catchAsyncErr = require('./../utils/catchAsyncErr')
const AppError = require('./../utils/appError')
const APIFeatures = require('../utils/apiFeatures')

exports.getAll = (Model, populateOptions) => catchAsyncErr(async (req, res, next) => {

    let filter = {}
    let doc;

    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitfields()
        .paginate();

    // const doc = await features.query.explain(); // exp for indexes in DB

    if (populateOptions) {
        doc = await features.query.populate(populateOptions);
    } else {
        doc = await features.query.select('-__v -createdAt -updatedAt');
    }

    res.status(200).json({
        status: 'success',
        resutls: doc.length,
        data: {
            data: doc
        }
    });
})

exports.getOne = (Model, populateOptions) => catchAsyncErr(async (req, res, next) => {

    let query = Model.findById(req.params.id)

    if (populateOptions) query = query.populate(populateOptions)

    const doc = await query.select('-__v -createdAt -updatedAt');

    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.createOne = (Model) => catchAsyncErr(async (req, res, next) => {

    const newModel = await Model.create(req.body)
    res.status(201).json({
        status: "success",
        data: {
            data: newModel
        }
    })
    next()
})

exports.updateOne = (Model) => catchAsyncErr(async (req, res, next) => {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.deleteOne = (Model) => catchAsyncErr(async (req, res, next) => {

    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }
    res.status(204).json({
        status: 'success',
        data: null
    })

})