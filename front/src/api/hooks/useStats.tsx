import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "../api"


type FormData = {
  id?: number
  value: number
  suffix: string
  label_ru: string
  label_en: string
  label_uz: string
}

const useStats = () => {
  const queryClient = useQueryClient()

  const getStats = () => {
    return useQuery({
      queryKey: ["stats"],
      queryFn: () => api.get("api/analytics/").then(res => res.data)
    })
  }

  const postStats = () => {
    return useMutation({
      mutationFn: (data: {value: number, suffix: string, label_ru: string, label_en: string, label_uz: string}) => api.post('api/analytics/', data ).then(res => res.data),
      onSuccess: () => {
        console.log('posted Successfully ')
        queryClient.invalidateQueries({
          queryKey: ['stats']
        })
        alert('Posted successfully')
      },
      onError: (error) => {
        console.log(error)
        alert(error.message)
      }
    })
  }

  const updateStats = () => {
    return useMutation({
      mutationFn: (data: FormData) => api.patch(`/api/analytics/${data.id}/`, {
        value: data.value,
        suffix: data.suffix,
        label_ru: data.label_ru,
        label_en: data.label_en,
        label_uz: data.label_uz
      }).then(res => res.data),
      onSuccess: () => {
        console.log("Updated successfully")
        queryClient.invalidateQueries({queryKey: ['stats']})
        alert("Updated successfully")
      },
      onError: (error) => { 
        console.log(error)
        alert(error.message)
      }
    })
  }

  const deleteStat = () => {
    return useMutation({
      mutationFn: (id: number) => api.delete(`/api/analytics/${id}/`),
      onSuccess: () => {
        console.log("Deleted successfully")
        queryClient.invalidateQueries({queryKey: ['stats']})
        alert("Deleted successfully")
      },
      onError: (error) => {
        console.log(error)
        alert(error.message)
      }
    })
  }
  
  
  
  return { getStats, postStats, updateStats, deleteStat }
}

export default useStats