var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var threadListSchema = new Schema({
    title: {type:String, required: true },
    color: {type:String, required: true , default: "#9e9e9e"},
    itemId: {type: Schema.Types.ObjectId, ref: "thread", required: true},

    timestamp: {type:Date, default: Date.now }
});

module.exports = mongoose.model('threadList', threadListSchema);

