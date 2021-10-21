import ApiData from '../apis/ApiData';

export const fetchImage = (image) => async dispatch => {
  const res = await ApiData.get("/photos");
  const slicedData = res.data.slice(0, 50);
  const updatedData = slicedData.map((item) => {
    return {
      Id: item.id,
      Title: item.title,
      Url: item.url,
      ThumbnailUrl: item.thumbnailUrl
    };
  });
  // console.log(updatedData);
  localStorage.setItem("JsonApi", JSON.stringify(updatedData));
  dispatch({ type: 'FETCH_IMAGE', payload: updatedData })
}

export const deleteImage = (id) => {
  console.log(id);
  return {
    type: 'DELETE_IMAGE',
    payload: id
  }
}

export const updateImage = (id) => {
  console.log(id)
  return {
    type: 'UPDATE_IMAGE',
    payload: id
  }
}