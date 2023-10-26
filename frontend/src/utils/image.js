module.exports.getImageName = (path) => {
  console.log(path);

  try {
    var imagename = path;
    console.log(imagename);
    return imagename;
  } catch (err) {
    return 'Image_not_available.png';
  }
};
// module.exports.getImageName=(path)=>{
//   console.log(path)

//   try {
//    var imagename = path.split("/")[1]
//    console.log(imagename)
//   return imagename
  
//   } catch (err) {
//       return "Image_not_available.png"
//   }
// }