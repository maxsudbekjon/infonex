import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "../api"
import { type CommentType } from "../../components/Portfolio"
import { type CommentTypeSecond } from "../../components/Testimonials"
import { type Comment } from "../../adminPanelComponents/CommentsPage"

const useComments = () => {
  const queryClient = useQueryClient()
  
  
  const getComments = () => {
    return useQuery({
      queryKey: ['comments'],
      queryFn: () => api.get('api/comments/').then(res => res.data)
    })
  }

  const updateComments = () => {
    return useMutation({
      mutationFn: (data: Comment) => api.patch(`api/comments/${data.id}/`, {
        full_name: data.full_name,
        company: data.company,
        position: data.position,
        comment: data.comment,
        stars: data.stars
      } ).then(res => res.data),
      onSuccess: () => {
        console.log("Updated successfully")
        queryClient.invalidateQueries({queryKey: ['comments']})
        alert("Updated successfully")
      },
      onError: (error) => {
        alert(error.message)
        console.log(error)
      }
    })
  }

  
  const deleteComments = () => {
    return useMutation({
      mutationFn: (id: number) => api.delete(`/api/comments/${id}/`),
      onSuccess: () => {
        console.log("Deleted successfully")
        queryClient.invalidateQueries({queryKey: ['comments']})
        alert("Deleted successfully")
      },
      onError: (error) => {
        console.log(error)
        alert(error.message)
      }
    })
  }
  
  const postComments = () => {
    return useMutation({
      mutationFn: (data: CommentType,) => api.post('/api/comment_p/', {
        full_name: data.full_name,
        company: data.company,
        position: data.position,
        comment: data.comment,
        stars: data.stars,
        project: data.project
      }).then(res => res.data),
      onSuccess: () => {
        console.log("Successfully posted")
        queryClient.invalidateQueries({
            queryKey: ['comments']
          })
        alert("Posted successfully")
      },
      onError: (error) => {
        console.log(error)
        alert(error.message)
      }
    })
  }

  const postCommentsSecond = () => {
    return useMutation({
      mutationFn: (data: CommentTypeSecond,) => api.post('/api/comments/', data).then(res => res.data),
      onSuccess: () => {
        console.log("Successfully posted")
        queryClient.invalidateQueries({
            queryKey: ['comments']
          })
        alert("Posted successfully")
      },
      onError: (error) => {
        alert(error.message)  
        console.log(error)
      }
    })
  }
  
  
  return { getComments, postComments, postCommentsSecond, deleteComments, updateComments }
}

export default useComments