import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { addReview } from './redux/reviewsSlice';
import './addReview.css';
import { addReview } from '../../actions/action';
import { AddNotification } from '../../../Admin/Redux/Action';
import { FaArrowRight } from 'react-icons/fa';

const AddReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [personName,setpersonName]=useState('')
  const [plateName,setplateName]=useState('')
  const [text,settext]=useState('')
  const [rating,setrating]=useState('')
  const [image,setimage]=useState('')
  const [error,seterror]=useState({})

  
    
    const handleImageChange=(event)=>{
      const file=event.target.files[0]
      if(file){
        const Image=URL.createObjectURL(file)
        setimage(Image)
      }}

       const handleSubmit=(event)=>{
        event.preventDefault()
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const date = today.getDate();
        const hour = today.getHours();

        const currentDate = month + "/" + date + "/" + year + "/" + hour;
        let errors={};
        if (!personName.trim()) errors.personName = 'الاسم مطلوب';
        if (!text.trim()) errors.text = 'نص المراجعة مطلوب';
        if (rating < 1) errors.rating = 'الرجاء تحديد التقييم';
        if (!text.trim()) errors.text = 'الصورة مطلوبة';

            seterror(errors)
    
            if (Object.keys(errors).length ==0) {
               const formData={
                id:Date.now(),
                date:currentDate,
                type:'reviews',
                personName,
                plateName,
                text,
                rating,
                image
               }
               dispatch(addReview(formData))
               dispatch(AddNotification(formData))
               navigate('/')
            }
       }
        const handleRatingChange = (rating) => {
          setrating( rating );
        };

  return (
    <div className="add-review-container">
      
     <div className='review-header'>
     <button dir='ltr' className={'backButton'} onClick={() => navigate(-1)}>
          <FaArrowRight className={'backIcon'} />
          رجوع
        </button>
     
      <div>
      <h2>أضف رأيك</h2>
      </div>
     </div>
      <form dir='rtl'  className='review-form ' onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>صورة الطبق:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {error.image && <span className="error">{error.image}</span>}
          {image && (
            <div className="image-preview">
              <img src={image} alt="Plate preview" />
            </div>
          )}
        </div>
        <div className="form-group">
          <label >اسم الطبق:</label>
          <input
            type="text"
            name="plateName"
            onChange={(e)=>setplateName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>اسمك:</label>
          <input
            type="text"
            name="personName"
            onChange={(e)=>setpersonName(e.target.value)}/>
          {error.personName && <span className="error">{error.personName}</span>}
        </div>

        <div className="form-group">
          <label>تصنيف:</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                type="button"
                key={num}
                className={`star ${num <= rating ? 'active' : ''}`}
                onClick={() => handleRatingChange(num)}
              >
                ★
              </button>
            ))}
          </div>
          {error.rating && <span className="error">{error.rating}</span>}
        </div>

        <div className="form-group">
          <label>مراجعة:</label>
          <textarea
            name="text"
            onChange={(e)=>settext(e.target.value)}
          />
          {error.text && <span className="error">{error.text}</span>}
        </div>

        <button type="submit" className="submit-review-btn">
        إرسال المراجعة
        </button>
      </form>
    </div>
  );
};

export default AddReview;