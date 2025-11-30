import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "../api"

const useService = () => {
  const queryClient = useQueryClient()
  
  const getService = () => {
    return useQuery({
      queryKey: ['services'],
      queryFn: () => api.get('api/services/').then(res => res.data)
    })
  }

  const deleteService = () => {
    return useMutation({
      mutationFn: (id: number) => api.delete(`api/services/${id}/`),
      onSuccess: () => {
        console.log("Deleted Successfully")
        queryClient.invalidateQueries({queryKey: ['services']})
        alert("Deleted successfully")
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }

  const postService = () => {
    return useMutation({
      mutationFn: (data: { icon: File, title_uz: string, title_ru: string, title_en: string, description_uz: string, description_ru: string, description_en: string}) => api.post("api/services/", data, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      }).then(res => res.data),
      onSuccess: () => {
        console.log("Posted successfully")
        queryClient.invalidateQueries({queryKey: ['services']})
        alert("Posted successfully")
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }
  

  const updateService = (id: number) => {
    return useMutation({
      mutationFn: (data: { icon: File, title_uz: string, title_ru: string, title_en: string, description_uz: string, description_ru: string, description_en: string}) => api.patch(`api/services/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => res.data),
      onSuccess: () => {
        console.log("Updated successfully")
        alert("Updated successfully")
        queryClient.invalidateQueries({queryKey: ['services']})
      },
      onError: (error) => {
        console.log(error)
        alert(error.message)
      }
    })
  }
  
  
  return { getService, deleteService, postService, updateService }
}

export default useService