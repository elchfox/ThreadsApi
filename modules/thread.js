var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var threadSchema = new Schema({
    title: {type:String, required: true },
    color: {type:String, default: "#9e9e9e"},
    itemId: {type: Schema.Types.ObjectId, ref: "thread"},

    timestamp: {type:Date, default: Date.now }
});

module.exports = mongoose.model('thread', threadSchema);

