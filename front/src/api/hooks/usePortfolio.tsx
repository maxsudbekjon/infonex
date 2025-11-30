import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "../api"

const usePortfolio = () => {
  const queryClient = useQueryClient()
  
  const getPortfolio = () => {
    return useQuery({
      queryKey: ['portfolio'],
      queryFn: () => api.get('api/portfolio-projects/').then(res => res.data)
    })
  }


  const postPortfolio = () => {
    return useMutation({
      mutationFn: (data: {image: File, link: string, field_uz: string, field_ru: string, field_en: string, title_uz: string, title_ru: string, title_en: string}) => api.post("api/portfolio-projects/", data, {
        headers: { 
          "Content-Type": "multipart/form-data"
        }
      }).then(res => res.data),
      onSuccess: () => {
        console.log("Posted successfully")
        alert("Posted successfully")
        queryClient.invalidateQueries({queryKey: ['portfolio']})
      },
      onError: (error) => {
        console.log(error)
        alert(error.message)
      }
    })
  }


  const updatePortfolio = (id: number) => {
    return useMutation({
      mutationFn: (data: {image: File, link: string, field_uz: string, field_ru: string, field_en: string, title_uz: string, title_ru: string, title_en: string}) => api.patch(`api/portfolio-projects/${id}/`, data, {
        headers: { 
          "Content-Type": "multipart/form-data"
        }
      }).then(res => res.data),
      onSuccess: () => {
        console.log("Updated successfully")
        alert("Updated successfully")
        queryClient.invalidateQueries({queryKey: ['portfolio']})
      },
      onError: (error) => {
        console.log(error)
        alert(error.message)
      }
    })
  }
  

  const deletePortfolio = () => {
    return useMutation({
      mutationFn: (id: number) => api.delete(`api/portfolio-projects/${id}/`),
      onSuccess: () => {
        console.log("Deleted successfully")
        alert("Deleted successfully")
        queryClient.invalidateQueries({queryKey: ['portfolio']})
      },
      onError: (error) => {
        console.log(error)
        alert(error.message)
      }
    })
  }
  
  return { getPortfolio, postPortfolio, updatePortfolio, deletePortfolio }
  
}

export default usePortfolio