import mongoose from "mongoose";

//  form
const formSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  district: { type: String },
  createdAt: { type: Date, default: Date.now },
});
export const Form = mongoose.model("Form", formSchema);

// Contact form
const contactFormSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});
export const ContactForm = mongoose.model("ContactForm", contactFormSchema);

// Franchise reister form

const registerFormSchema = new mongoose.Schema({
  name:{type:String},
  place:{type:String},
  localbody:{type:String},
  district:{type:String},
  mobile:{type:Number},
  email:{type:String},
  center:{type:String},
  heardfrom:{type:String},
})
export const RegisterForm = mongoose.model('RegisterForm',registerFormSchema)


const imageSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,

    enum: ['home', 'about', 'service', 'domains','certificates','advantages','review','logo','Formimage'], 

  },
  position: {
    type: String,
    required: true,
  },

  title: { type: String },
  description: { type: String },
  image: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const ImageSchema =mongoose.model('imageupload',imageSchema)

const SubServiceSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const ServiceItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  subServices: [SubServiceSchema]
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  services: [ServiceItemSchema]
});
export const Service = mongoose.model("Service", CategorySchema);

const videoSchema = new mongoose.Schema({
  page: { type: String, required: true },
  title: { type: String },
  video: { data: Buffer, contentType: String }
});

export const VideoSchema = mongoose.model("Video", videoSchema);





const gallerySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  // For images: stored as file buffer
  // For videos: store the video URL
  src: {
    data: Buffer,
    contentType: String,
    url: String, // for videos
  },
  // Optional thumbnail for videos (or custom for images)
  thumbnail: {
    data: Buffer,
    contentType: String,
    url: String,
  },
}, { timestamps: true });

export const GallerySchema = mongoose.model("Gallery", gallerySchema);
