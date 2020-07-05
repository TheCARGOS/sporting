const { model, Schema } = require("mongoose")
const bcrypt = require("bcryptjs")

const playerSchema = new Schema({
	name: {
        type: String,
        uppercase: true,
        required: true
    },
	nickname: String,
	// skills: {
	// 	powerShot: {
    //         type: Number,
    //         minlength: 0,
    //         maxlength: 110,
    //         default: 75
    //     },
	// 	accuracy: {
    //         type: Number,
    //         minlength: 0,
    //         maxlength: 110,
    //         default: 75
    //     },
	// 	assist: {
    //         type: Number,
    //         minlength: 0,
    //         maxlength: 110,
    //         default: 75
    //     },
	// 	intercepter: {
    //         type: Number,
    //         minlength: 0,
    //         maxlength: 110,
    //         default: 75
    //     },
	// 	fortitude: {
    //         type: Number,
    //         minlength: 0,
    //         maxlength: 110,
    //         default: 75
    //     },
	// 	mark: {
    //         type: Number,
    //         minlength: 0,
    //         maxlength: 110,
    //         default: 75
    //     }
    // },
    position: {
        type: String,
        required: true,
        enum: ["GK", "DEF", "MID", "FWD"],
        default: "DEF",
    },
	country: {
        type: String,
        enum: ["PER"],
        default: "PER"
    },
	rates: Array,
	username: {
        type: String,
        unique: true,
        maxlength: 20,
        minlength: 4
    },
	password: {
        type: String,
        require: true,
        maxlength: 20,
        minlength: 4
    },
    urlImage: {
        type: String,
        required: true
    }
})

playerSchema.pre("save", function () {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
})

playerSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = model("Player", playerSchema)