const Publication = require("../models/publicationModel");
const User = require("../models/userModel");
const validator = require("validator");

exports.createPublication = async (publicationData) => {
  //checkear que id de usuario existe
  const userFound = await User.findOne({ _id: publicationData.userId });
  if (publicationData.description.length < 30){
    throw new Error("Description too short");
  }
  if (!userFound) {
    throw new Error("User id does not exist");
  }
  const newPublication = new Publication(publicationData);
  const savedPublication = await newPublication.save();
  //agregar nueva publicacion al array de publicaciones del usuario
  userFound.publications.push(savedPublication._id);
  await userFound.save();
  return newPublication;
};

exports.deletePublication = async (publicationData) => {
  const deletedPublication = await Publication.findByIdAndDelete(
    publicationData.publicationId
  );
  if (!deletedPublication) {
    throw new Error("Publication not found");
  }
  await User.updateOne(
    { _id: publicationData.userId },
    { $pull: { publications: publicationData.publicationId } }
  );
  return deletedPublication;
};

exports.getPublications = async () => {
    const publications = await Publication.find();
    if (!publications){
        throw new Error('Error fetching Publications')
    }
    return publications;
}

exports.updatePublication = async(publicationData) => {

  if (publicationData.description.length < 30) {
    throw new Error("Description too short");
  }
  const updatedPublication = await Publication.findOneAndUpdate(
    { _id: publicationData.publicationId },
    { description: publicationData.description },
    { new: true }
  );
  if (!updatedPublication) {
    throw new Error("Publication not found");
  }
  return updatedPublication;

}
//TODO:

//TODO MAS ADELANTE:
//get publications cerca de una area (sortear por rangos de latitud y calcular distancias, mostrar segun filtro de kms)
//get publications por ciudad o comuna
//limite de 5 publicaiones por dia
//limite por ip


//hecho:
//crear publicacion
//borrar publicacion
//listar publicaciones
//actualizar publicacion