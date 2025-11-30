import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import useComments from '../api/hooks/useComments';

export interface Comment {
  id: number;
  full_name: string;
  company?: string;
  position?: string;
  comment: string;
  stars: number;
}

export function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, full_name: 'Alisher Karimov', company: 'IT Company LLC', position: 'CEO', comment: 'Juda yaxshi xizmat, professional jamoa. Loyihamiz o\'z vaqtida va sifatli bajarildi.', stars: 5 },
    { id: 2, full_name: 'Marina Petrova', company: 'Digital Agency', position: 'Marketing Director', comment: 'Отличная работа! Рекомендую всем.', stars: 5 },
  ]);

  const [isPost, setIsPost] = useState<boolean>(true)

  const { getComments, deleteComments, updateComments, postCommentsSecond } = useComments()
  const { data } = getComments()
  const { mutate: delComment } = deleteComments() 
  const { mutate: changeComment } = updateComments()
  const { mutate: addComment } = postCommentsSecond()

  useEffect(() => {
    console.log(data)
    setComments(data)
  },[data])
  
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [formData, setFormData] = useState({id: NaN, full_name: '', company: '', position: '', comment: '', stars: 5 });

  const openModal = (comment?: Comment) => {
    if (comment) {
      setIsPost(false)
      setEditingComment(comment);
      setFormData(prev => ({...prev, id: comment.id}))
      setFormData(prev => ({...prev, full_name: comment.full_name, company: comment.company || '', position: comment.position || '', comment: comment.comment, stars: comment.stars }));
    } else {
      setEditingComment(null);
      setFormData({id: NaN, full_name: '', company: '', position: '', comment: '', stars: 5 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingComment(null);
  };

  const handleSave = () => {
    if(isPost) {
      addComment({full_name: formData.full_name, company: formData.company, position: formData.position, comment: formData.comment, stars: formData.stars })
    } else {
      changeComment(formData)
    }
    if (editingComment) {
      setComments(comments.map(comment => comment.id === editingComment.id ? { ...comment, ...formData } : comment));
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm("Bu sharhni o'chirmoqchimisiz?")) {
      setComments(comments.filter(comment => comment.id !== id));
      delComment(id)
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl tracking-tight mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Sharhlar</h1>
          <p className="text-gray-500">Mijozlar sharhlari va fikrlari</p>
        </div>
        <button onClick={() => openModal()} className="group flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Yangi sharh
        </button>
      </div>

      <div className="space-y-6">
        {comments.map((comment, index) => (
          <div key={comment.id} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-xl mb-2 tracking-tight">{comment.full_name}</h3>
                {(comment.company || comment.position) && (
                  <div className="text-sm text-gray-600 mb-3">
                    {comment.position}{comment.company && comment.position ? ', ' : ''}{comment.company}
                  </div>
                )}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-4 h-4 ${star <= comment.stars ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-6 bg-gray-50 p-6 rounded-xl leading-relaxed">{comment.comment}</p>
            <div className="flex gap-2">
              <button onClick={() => openModal(comment)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300">
                <Edit2 className="w-4 h-4" />
                Tahrirlash
              </button>
              <button onClick={() => handleDelete(comment.id)} className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl tracking-tight">{editingComment ? 'Sharhni tahrirlash' : 'Yangi sharh qo\'shish'}</h2>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"><X className="w-6 h-6" /></button>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700">To'liq ism</label>
                <input type="text" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none" placeholder="Ism Familiya" />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Kompaniya (ixtiyoriy)</label>
                <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none" placeholder="Kompaniya nomi" />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Lavozim (ixtiyoriy)</label>
                <input type="text" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none" placeholder="Lavozim" />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Sharh matni</label>
                <textarea value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} rows={5} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:bg-white transition-all duration-300 outline-none resize-none" placeholder="Mijoz sharhi..." />
              </div>
              <div>
                <label className="block text-sm mb-3 text-gray-700">Baho</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setFormData({ ...formData, stars: star })} className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300">
                      <Star className={`w-7 h-7 ${star <= formData.stars ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 p-8 border-t-2 border-gray-100">
              <button onClick={closeModal} className="px-6 py-3 text-sm bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300">Bekor qilish</button>
              <button onClick={handleSave} className="px-6 py-3 text-sm bg-gradient-to-r from-black to-gray-800 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">Saqlash</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
