from rest_framework import serializers
from .models import AnalyticsModel, AboutDataModel, ServiceModel, PortfolieProjectsModel, CommentModel, ProjectSuggestionModel

class AnalyticsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsModel
        fields = '__all__'

class AboutDataModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutDataModel
        fields = '__all__'

class ServiceModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceModel
        fields = '__all__'

class PortfolieProjectsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolieProjectsModel
        fields = '__all__'


class CommentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentModel
        fields = ["id","full_name", "company", "position", "comment", "stars"]


class CommentModelWithProjectSerializer(serializers.ModelSerializer):
    class Meta: 
        model = CommentModel
        fields = '__all__'

class ProjectSuggestionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectSuggestionModel
        fields = '__all__'