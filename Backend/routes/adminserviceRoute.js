import express from 'express'
import { adminService } from '../models/adminService'

const router = express.Router()

router.post('/servicelink',(req,res)=>{
    
    try{
     const {name,link} =req.body; 

      if(!name){
        res.status(400).json({
            success:false,
            message:'name and link required'
        })
      }
     const service = new adminService ({name,link});
     service.save()

     res.status(200).json({
        success:true,
        message:'service link added successfully',
        data:service
     })
    }
    catch(error){
       res.status(500).json({
        success:false,
        message:'internal server error'
       })
    }

})

export default router;