import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "../api"


type AboutType = {
  id: number
  title_ru: string
  title_en: string
  title_uz: string
  description_ru: string
  description_en: string
  description_uz: string
}

const useAbout = () => {
  const queryClient = useQueryClient()
  
  const getAbout = () => {
    return useQuery({
      queryKey: ["about"],
      queryFn: () => api.get("api/about/").then(res => res.data)})
  }

  const postAbout = () => {
    return useMutation({
      mutationFn: (data: {title_uz: string, title_ru: string, title_en: string, description_uz: string, description_ru: string, description_en: string}) => api.post('api/about/', data).then(res => res.data),
      onSuccess: () => {
        console.log("Posted successfully")
        queryClient.invalidateQueries({queryKey: ["about"]})
        alert("Posted successfully")
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }
  
  
  const updateAbout = ( ) => {
    return useMutation({
      mutationFn: (data: AboutType) => api.patch(`/api/about/${data?.id}/`, {
        title_ru: data.title_ru,
        title_en: data.title_en,
        title_uz: data.title_uz,
        description_ru: data.description_ru,
        description_en: data.description_en,
        description_uz: data.description_uz,
      }).then(res => res.data),
      onSuccess: () => {
        console.log("Updated successfully")
        alert("Updated successfully")
        queryClient.invalidateQueries({queryKey: ['about']})
      },
      onError: (error) => {
        console.log(error)
        alert(error.message)
      }
    })
  }

  const deleteAbout = () => {
    return useMutation({
      mutationFn: (id: number) => api.delete(`/api/about/${id}/`),
      onSuccess: () => {
        console.log("Successfully deleted")
        queryClient.invalidateQueries({queryKey: ['about']})
        alert("Successfully deleted")
      },
      onError: (error) => {
        console.log(error)
        alert(error.message)
      }
    })
  }


  return { getAbout, deleteAbout, updateAbout, postAbout }
}

export default useAbout