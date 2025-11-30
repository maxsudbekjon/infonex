from django.urls import path
from . import views

urlpatterns = [
  path('analytics/', views.AnalyticsView.as_view(), name='analytics'),
  path('analytics/<int:pk>/', views.AnalyticsViewUpdate.as_view(), name='analytics-update'),
  path('about/', views.AboutDataView.as_view(), name='about_data'),
  path('about/<int:pk>/', views.AboutDataViewUpdate.as_view(), name='about_data-update'),
  path('services/', views.ServiceView.as_view(), name='services'),
  path('services/<int:pk>/', views.ServiceViewUpdate.as_view(), name="services-updated"),
  path('portfolio-projects/', views.PortfolieProjectsView.as_view(), name='portfolio_projects'),
  path('portfolio-projects/<int:pk>/', views.PortfolioProjectsViewUpdate.as_view(), name='portfolio_projects_update'),
  path('comments/', views.CommentView.as_view(), name='comments'),
  path('comment_p/', views.CommentViewWithProject.as_view(), name='comment-p'),
  path('comments/<int:pk>/', views.CommentViewUpdate.as_view(), name='comments_update'),
  path('project-suggestions/', views.ProjectSuggestionView.as_view(), name='project_suggestions'),
  path('project-suggestions/<int:pk>/', views.ProjectSuggestionViewUpdate.as_view(), name='project_suggestions_update')
] 