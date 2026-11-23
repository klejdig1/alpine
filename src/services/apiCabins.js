import {
  getLocalCabins,
  createEditLocalCabin,
  deleteLocalCabin,
} from "./localBackend.js";

export const getCabins = getLocalCabins;
export const createEditCabin = createEditLocalCabin;
export const deleteCabin = deleteLocalCabin;
