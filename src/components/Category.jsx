import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addCategory, getAVideo, getCategory, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoCard from './VideoCard';
import { Row,Col, Card } from 'react-bootstrap';



function Category() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [category, setCategory] = useState({
    caption: "",allVideos:[]
  })
  // console.log(category);

  const [allCategories,setAllCategories]=useState([])


 const handleAddCategory= async ()=>{
 const response= await addCategory(category)
 if(response.status>=200 && response.status<300){
 toast.success("Category Successfully Added")
  handleClose()
  displayCategory()
 }else{
  toast.warning("Something went wrong try again late")
 }

console.log(allCategories);

 }

 const dragover=(e)=>{
  e.preventDefault()
  console.log("inside dragover");
 }

 const videoDrop=async (e,categoryID)=>{
  console.log(`dropped inside the categoryid ${categoryID}`);
  const videoid=e.dataTransfer.getData("VideoID")
  console.log(videoid);



  const {data}= await getAVideo(videoid)
 console.log(data);

//to find the oarticular category with specified id
 let selectedCategory =allCategories?.find(item=>item.id===categoryID)
 console.log(selectedCategory);
 //data is added to the all videos array in the particular category with specified id
 selectedCategory.allVideos.push(data)
 console.log(selectedCategory);

await updateCategory(categoryID,selectedCategory)
displayCategory()

 }

 

 const displayCategory=async ()=>{
  const {data}=await getCategory()
  setAllCategories(data)
  

 }
 console.log(allCategories);

 useEffect(()=>{
  displayCategory()
 },[])

 
 
  return (
    <>
      
        <div className='d-grid ms-3'>
          <button onClick={handleShow} className=' btn btn-warning '>Add New Category</button>
        </div>
       
        {
            allCategories?.length>0?
            allCategories.map((item)=>(<div className='m-5 border border-secondary  rounded p-3'>
              <div className="d-flex justify-content-between  align-items-center " droppable onDragOver={(e)=>dragover(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
              <p>{item.caption}</p>
              <button className='btn btn-danger '><i className='fa-solid fa-trash-can'></i></button>
              </div>
              <Row>
                <Col sm={12}>
                  {
                    item.allVideos?.length>0?
                    item.allVideos.map(video=>(<VideoCard displayVideo={Card}/> ))
                    : <p>Nothing to display</p>
                  }
                </Col>
              </Row>
            </div>)):
            <p>Nothing to display</p>
          }
    
     
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title><i class="fa-solid fa-film text-warning "></i>Add New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className=' border  border-secondary p-3 rounded'>
  
  
              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
  
                <Form.Control type="text" placeholder="Enter Category ID" />
              </Form.Group> */}
  
              <Form.Group className="mb-3 " controlId="formBasicEmail">
  
                
  
                <Form.Control onChange={(e) => setCategory({ ...category,caption: e.target.value })} type="text" placeholder="Enter Category Caption" />
              </Form.Group>
  
  
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory} variant="warning">Add</Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
      
    </>
  )
}

export default Category