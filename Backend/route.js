import express from "express";
import { Form, ContactForm,RegisterForm,ImageSchema,Service ,GallerySchema,VideoSchema} from "./schema.js";
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage });


router.post('/submit-form',async(req,res)=>{
  try {
    const {name,email,phone,district} = req.body;
    const newForm = new Form({name,email,phone,district});
    await newForm.save()

    res.status(200).json({message:'Form data saved successfully'})
  } catch (error) {
    console.error('Form submission error:',error)
    res.status(500).json({message:'server error'})
  }
})

router.post('/contact-form',async(req,res)=>{
  try {
    const {name,phone,message} = req.body;
    const newcontactForm = new ContactForm({name,phone,message});
    await newcontactForm.save()

    res.status(200).json({message:'ContactForm data saved successfully'})
  } catch (error) {
    console.error('ContactForm submission error:',error)
    res.status(500).json({message:'server error'})
  }
})

router.post('/register-form',async(req,res)=>{
  try {
    const {name,place,localbody,district,mobile,email,center,heardfrom} = req.body
    const newregisterForm = new RegisterForm({name,place,localbody,district,mobile,email,center,heardfrom})
    await newregisterForm.save()
    res.status(200).json({message:'RegisterForm data saved successfully'})

  } catch (error) {
        console.error('RegisterForm submission error:',error)
    res.status(500).json({message:'server error'})
  }
})

router.post('/uploads', upload.single('image'), async (req, res) => {
  try {
    const { page, position, title, description } = req.body;

    if (!page || !position || !req.file) {
      return res.status(400).json({ error: 'Page, position, and image are required' });
    }

    const newImage = new ImageSchema({
      page,
      position,
      title,
      description,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      }
    });

    await newImage.save();
    res.status(201).json({ message: 'Image uploaded successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});



router.get('/uploads', async (req, res) => {
  try {
    const { page, position, title } = req.query;

    const query = {};
    if (page) query.page = page;
    if (position) query.position = position;
    if (title) query.title = { $regex: title, $options: 'i' }; 

    const images = await ImageSchema.find(query);

    const formattedImages = images.map(img => ({
      _id: img._id,
      page: img.page,
      position: img.position,
      title: img.title,
      description: img.description,
      image: `data:${img.image.contentType};base64,${img.image.data.toString('base64')}`
    }));

    res.status(200).json(formattedImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch filtered images' });
  }
});



router.post("/services", upload.single("image"), async (req, res) => {
  try {
    const { name, title } = req.body;
    let subServices = req.body.subservices;

    // Ensure subservices is an array
    if (typeof subServices === "string") {
      subServices = [subServices];
    }

    // Convert uploaded image to base64 if exists
    let imageBase64 = "";
    if (req.file) {
      imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    // Check if category exists
    let existingCategory = await Service.findOne({ name });

    if (existingCategory) {
      existingCategory.services.push({
        title,
        image: imageBase64,
        subServices: subServices.map((s) => ({ name: s }))
      });
      await existingCategory.save();
      return res.status(200).json({ message: "Service added to existing category", data: existingCategory });
    } else {
      const newCategory = new Service({
        name,
        services: [
          {
            title,
            image: imageBase64,
            subServices: subServices.map((s) => ({ name: s }))
          }
        ]
      });
      await newCategory.save();
      return res.status(201).json({ message: "New category created", data: newCategory });
    }
  } catch (error) {
    console.error("Error adding/updating service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Fetch all categories
router.get("/services", async (req, res) => {
  try {
    const categories = await Service.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/videos", upload.single("video"),  async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    const newVideo = new VideoSchema({
      page: req.body.page,
      title: req.body.title || "",
      video: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });

    await newVideo.save();
    res.json({ message: "Video uploaded successfully", video: newVideo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/videos", async (req, res) => {
  try {
    const { page } = req.query; // Get ?page=Why-mithram from URL

    const query = page ? { page } : {};
    const videos = await VideoSchema.find(query);

    // Convert binary data to Base64 so it can be sent to frontend
    const formattedVideos = videos.map(v => ({
      _id: v._id,
      page: v.page,
      title: v.title,
      video: {
        contentType: v.video.contentType,
        data: v.video.data.toString("base64")
      }
    }));

    res.json(formattedVideos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ message: "Server error" });
  }
});



router.post("/gallery", upload.fields([{ name: "src" }, { name: "thumbnail" }]), async (req, res) => {
  try {
    const { type, title, videoUrl } = req.body;

    if (!type || !title) {
      return res.status(400).json({ error: "Type and title are required" });
    }

    let newItem;

    if (type === "image") {
      if (!req.files?.src) return res.status(400).json({ error: "Image file required" });

      newItem = new GallerySchema({
        type,
        title,
        src: {
          data: req.files.src[0].buffer,
          contentType: req.files.src[0].mimetype
        }
      });
    }

    if (type === "video") {
      if (!videoUrl) return res.status(400).json({ error: "Video URL required" });
      
      newItem = new GallerySchema({
        type,
        title,
        src: { url: videoUrl },
      });

      // Optional custom thumbnail
      if (req.files?.thumbnail) {
        newItem.thumbnail = {
          data: req.files.thumbnail[0].buffer,
          contentType: req.files.thumbnail[0].mimetype
        };
      }
    }

    await newItem.save();
    res.status(201).json({ message: "Gallery item added successfully", item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


 //GET - Fetch all gallery items

router.get("/gallery", async (req, res) => {
  try {
    const items = await GallerySchema.find().sort({ createdAt: -1 });

    // Convert buffer to base64
    const response = items.map(item => {
      let src = null;
      let thumbnail = null;

      if (item.type === "image" && item.src?.data) {
        src = `data:${item.src.contentType};base64,${item.src.data.toString("base64")}`;
      }

      if (item.type === "video") {
        src = item.src.url;
        if (item.thumbnail?.data) {
          thumbnail = `data:${item.thumbnail.contentType};base64,${item.thumbnail.data.toString("base64")}`;
        }
      }

      return {
        _id: item._id,
        type: item.type,
        title: item.title,
        src,
        thumbnail
      };
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;


