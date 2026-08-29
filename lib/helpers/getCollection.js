import { COLLECTIONSBASES } from "@/lib/constants/collectionsBases";

export function getCollection(id) {
  return COLLECTIONSBASES.find((collection) => collection.id === id);
}
