from django.db import models

class AnalyticsModel(models.Model):
  value = models.SmallIntegerField()
  suffix = models.CharField(max_length=2)
  label_ru = models.CharField(max_length=100)
  label_en = models.CharField(max_length=100)
  label_uz = models.CharField(max_length=100)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

class AboutDataModel(models.Model):
  title_ru = models.CharField(max_length=200)
  title_en = models.CharField(max_length=200)
  title_uz = models.CharField(max_length=200)
  description_ru = models.TextField()
  description_en = models.TextField()
  description_uz = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class ServiceModel(models.Model):
  icon = models.ImageField(upload_to='service_icons/')
  title_ru = models.CharField(max_length=200)
  title_en = models.CharField(max_length=200)
  title_uz = models.CharField(max_length=200)
  description_ru = models.TextField()
  description_en = models.TextField()
  description_uz = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)



class PortfolieProjectsModel(models.Model):
  image = models.ImageField(upload_to='portfolie_images/')
  link = models.URLField()
  field_ru = models.CharField(max_length=100)
  field_en = models.CharField(max_length=100)
  field_uz = models.CharField(max_length=100)  
  title_ru = models.CharField(max_length=200)
  title_en = models.CharField(max_length=200)
  title_uz = models.CharField(max_length=200)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class CommentModel(models.Model): 
  full_name = models.CharField(max_length=200)
  company = models.CharField(max_length=200, blank=True, null=True)
  position = models.CharField(max_length=100, blank=True, null=True)
  comment = models.TextField() 
  stars = models.SmallIntegerField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  project = models.ForeignKey(PortfolieProjectsModel, on_delete=models.CASCADE, blank=True, null=True)  


class ProjectSuggestionModel(models.Model):
  name = models.CharField(max_length=200)
  email = models.EmailField()
  message = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
