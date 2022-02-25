import { useCollection,useDocument } from "@nandorojo/swr-firestore"

export default function getModModuloInicial({auth}){
  const { data:mods } = useCollection('mods', { where: [
      ['esInicial', '==', true],
      ['idUsuario', '==', auth.id]
    ],
    limit: 1,
  })
  if(!mods)return "Cargando Mod..."
  return mods[0]
}
export function getModuloMod({id}){
  const { data } = useDocument(`mods/${id}`)
  if(!data)return "Cargando Mod..."
  return data
}