import React, { useState, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux';
import { fetchImage, deleteImage, updateImage } from '../actions/ApiAction';
import { Button } from 'react-bootstrap';
import ModalInput from './ModalInput';

const FetchApi = ({ image, deleteImage, updateImage }) => {
    const [jsonData, setjsonData] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const emptyObject = {
        Id: jsonData.length + 1,
        Title: "",
        Url: "",
        ThumbnailUrl: ""
    }
    // const className = toggleModal ? "active" : "disable"

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("JsonApi"))
        console.log(data);
        setjsonData(data)
    }, [image, toggleModal])

    const handleClick = (item) => {
        setToggleModal(true);
        updateImage(item);
        document.getElementById('table-container').style.filter = 'blur(1.5px)'
    }

    return (

        <div>
            <div id="table-container">
                <button type="button" onClick={() => handleClick(emptyObject)} className="update-btn">Create Image</button>
                <BootstrapTable data={jsonData} bordered striped={true} hover={true} condensed={true} tableHeaderClass="bg-danger" trClassName="bg-info"  >
                    <TableHeaderColumn width='150' dataField='Id' isKey={true} >ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='Title' >Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='Url'>URL</TableHeaderColumn>
                    <TableHeaderColumn dataField='ThumbnailUrl'>ThumbnailUrl</TableHeaderColumn>
                    <TableHeaderColumn width='120' dataFormat={(cell, row) => {
                        return (
                            <>
                                <Button onClick={() => { deleteImage(row.Id); }}>Delete</Button>
                            </>
                        );
                    }} >Delete</TableHeaderColumn>
                    <TableHeaderColumn width='120' dataFormat={(cell, row) => {
                        return (
                            <>
                                <Button onClick={() => handleClick(row)}>Update</Button>
                            </>
                        );
                    }} >Update</TableHeaderColumn>
                </BootstrapTable>
            </div>
            {toggleModal && <ModalInput setToggleModal={setToggleModal} />}
        </div>
    )
}
const mapStateToProps = (state) => {
    console.log(state.images);
    return { image: state.images }
}

export default connect(mapStateToProps, { fetchImage, deleteImage, updateImage })(FetchApi);
