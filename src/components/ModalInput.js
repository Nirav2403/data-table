import React, { useState } from 'react';
import { connect } from 'react-redux';

const ModalInput = ({ setToggleModal, image }) => {
    const [dataObject, setDataObject] = useState(image)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataObject({ ...dataObject, [name]: value })
        console.log(image, dataObject);
    }

    const handleClick = () => {
        setToggleModal(false);
        document.getElementById('table-container').style.filter = 'blur(0px)';
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem("JsonApi"))
        if (image.Title !== "") {
            const newData = data.map((item) => {
                if (item.Id === dataObject.Id) {
                    return dataObject
                }
                else {
                    return item
                }
            })
            localStorage.setItem("JsonApi", JSON.stringify(newData))
        }else{
            const newData = [...data,dataObject]
            
            localStorage.setItem("JsonApi",JSON.stringify(newData))
        }
        setToggleModal(false)
        document.getElementById('table-container').style.filter = 'blur(0px)';
    }
    return (
        <div id="modal-container">
            <button className="close-btn" onClick={() => handleClick()} ><i className="fa fa-close"></i></button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" name="Title" value={dataObject.Title} onChange={handleChange} />
                <label htmlFor="title">Url:</label>
                <input type="text" name="Url" value={dataObject.Url} onChange={handleChange} />
                <label htmlFor="title">ThumbnailUrl:</label>
                <input type="text" name="ThumbnailUrl" value={dataObject.ThumbnailUrl} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

// const mapDispatchToProps = {
//      fetchImage, deleteImage, updateImage 
// }

const mapStateToProps = (state) => {
    console.log(state.image);
    return { image: state.images }
}

export default connect(mapStateToProps, null)(ModalInput);