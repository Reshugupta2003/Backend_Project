import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
       videFile : {
         type : String,
         required : [true, 'required field']
       },
       thumbnail : {
        type : String,
        trim : true
       },
       owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
       },
       title : {
        type : String,
        required : true
       },
       description : {
         type : String,
         required : true
       },
       duration : {
         type : Number,
         required : true
       },
       views : {
         type : Number,
         default : 0,
       },
       isPublished : {
        type : Boolean,
        default : true
       },
    },
    {
        timestamps : true
    }
);

videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video", videoSchema);

/*
npm fund - These open-source projects accept donations if you want to support them.
npm update - update packages of npm
npm outdated - check outdated packages
npm audit - Scans your project dependencies for known security vulnerabilities and displays a report.
npm list
*/