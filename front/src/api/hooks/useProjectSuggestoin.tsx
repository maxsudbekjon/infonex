import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "../api"

type SuggestionData = {
  name: string;
  email: string;
  message: string;
}

const useProjectSuggestion = () => {
  const queryClient = useQueryClient()
  
  const getSuggestions = () => {
    return useQuery({
      queryKey: ['suggestions'],
      queryFn: () => api.get('api/project-suggestions/').then(res => res.data)
    })
  }

  const deleteSuggestion = () => {
    return useMutation({
      mutationFn: (id: number) => api.delete(`api/project-suggestions/${id}/`),
      onSuccess: () => {
        console.log("Deleted Successfully")
        alert("Deleted successfully")
        queryClient.invalidateQueries({queryKey: ['suggestions']})
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }
  
  const postSuggestion = () => {
    return useMutation ({
      mutationFn: (data: SuggestionData) => api.post('api/project-suggestions/', data).then(res => res.data),
      onSuccess: () => {
        console.log("Posted successfully")
        queryClient.invalidateQueries({queryKey: ['suggestions']})
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }

  return { getSuggestions, postSuggestion, deleteSuggestion }
}

export default useProjectSuggestion