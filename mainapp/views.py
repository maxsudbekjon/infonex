from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from .models import AnalyticsModel, AboutDataModel, ServiceModel, PortfolieProjectsModel, CommentModel, ProjectSuggestionModel
from .serializers import AnalyticsModelSerializer, AboutDataModelSerializer, ProjectSuggestionModelSerializer, ServiceModelSerializer, PortfolieProjectsModelSerializer, CommentModelSerializer, CommentModelWithProjectSerializer
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema


class AllowPublicPostOtherwiseSuperUser(BasePermission):
    def has_permission(self, request, view):
        if request.method in ["GET", "POST"]:
            return True

        return (
            request.user
            and request.user.is_authenticated
            and request.user.is_superuser
        )

class IsSuperUserForWrite(BasePermission):
    """
    Allow anyone to GET.
    Only superusers can POST, PATCH, DELETE.
    """

    def has_permission(self, request, view):
        if request.method == "GET":
            return True

        return bool(request.user and request.user.is_authenticated and request.user.is_superuser)


class PublicPostAPIView(APIView):
    permission_classes = [AllowPublicPostOtherwiseSuperUser]
    authentication_classes = [JWTAuthentication]

    def get_authenticators(self):
        if not self.request:
            return super().get_authenticators()

        if self.request.method in ["GET", "POST"]:
            return []

        return super().get_authenticators()

class SuperUserWriteAPIView(APIView):
    permission_classes = [IsSuperUserForWrite]
    authentication_classes = [JWTAuthentication]

    def get_authenticators(self):
        if getattr(self, 'request', None) and self.request.method == "GET":
            return []
        return super().get_authenticators()

@extend_schema(request=AnalyticsModelSerializer, responses=AnalyticsModelSerializer)
class AnalyticsView(SuperUserWriteAPIView):
    permission_classes = [IsSuperUserForWrite]
    

    def get(self, request, *args, **kwargs):
        data = AnalyticsModel.objects.all().order_by('-id')
        serializer = AnalyticsModelSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = AnalyticsModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@extend_schema(request=AnalyticsModelSerializer, responses=AnalyticsModelSerializer)
class AnalyticsViewUpdate(SuperUserWriteAPIView):
    permission_classes = [IsSuperUserForWrite]

    
    def patch(self, request, pk):
        analytics_obj = get_object_or_404(AnalyticsModel, pk=pk)
        serializer = AnalyticsModelSerializer(analytics_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
    def delete(self, request, pk):
        data = get_object_or_404(AnalyticsModel, pk=pk)
        data.delete()
        return Response({"detail": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


@extend_schema(request=AboutDataModelSerializer, responses=AboutDataModelSerializer)
class AboutDataView(SuperUserWriteAPIView):
    permission_classes = [IsSuperUserForWrite]

    def get(self, request, *args, **kwargs):
        data = AboutDataModel.objects.all().order_by('-id')
        serializer = AboutDataModelSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
  
    def post(self, request, *args, **kwargs):
        serializer = AboutDataModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@extend_schema(request=AboutDataModelSerializer, responses=AboutDataModelSerializer)
class AboutDataViewUpdate(SuperUserWriteAPIView):
    permission_classes = [IsSuperUserForWrite]


    def patch(self, request, pk):
        abouddata_obj = get_object_or_404(AboutDataModel, pk=pk)
        serializer = AboutDataModelSerializer(abouddata_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

    def delete(self, request, pk):
        data = get_object_or_404(AboutDataModel, pk=pk)
        data.delete()
        return Response({"detail": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

@extend_schema(request=ServiceModelSerializer, responses=ServiceModelSerializer)
class ServiceView(SuperUserWriteAPIView):
    permission_classes = [IsSuperUserForWrite]


    def get(self, request, *args, **kwargs):
        data = ServiceModel.objects.all().order_by('-id')
        serializer = ServiceModelSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = ServiceModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@extend_schema(request=ServiceModelSerializer, responses=ServiceModelSerializer)
class ServiceViewUpdate(SuperUserWriteAPIView):
    permission_classes = [IsSuperUserForWrite]


    def patch(self, request, pk):
        service_obj = get_object_or_404(ServiceModel, pk=pk)
        serializer = ServiceModelSerializer(service_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
    
    def delete(self, request, pk):
        data = get_object_or_404(ServiceModel, pk=pk)
        data.delete()
        return Response({"detail": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

@extend_schema(request=PortfolieProjectsModelSerializer, responses=PortfolieProjectsModelSerializer)
class PortfolieProjectsView(SuperUserWriteAPIView):
    permission_classes = [IsSuperUserForWrite]


    def get(self, request, *args, **kwargs):
        data = PortfolieProjectsModel.objects.all().order_by('-id')
        serializer = PortfolieProjectsModelSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = PortfolieProjectsModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@extend_schema(request=PortfolieProjectsModelSerializer, responses=PortfolieProjectsModelSerializer)
class PortfolioProjectsViewUpdate(SuperUserWriteAPIView):
    permission_classes = [IsSuperUserForWrite]


    def patch(self, request, pk):
        project_obj = get_object_or_404(PortfolieProjectsModel, pk=pk)
        serializer = PortfolieProjectsModelSerializer(project_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    def delete(self, request, pk):
        data = get_object_or_404(PortfolieProjectsModel, pk=pk)
        data.delete()
        return Response({"detail": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT) 
    
    
@extend_schema(request=CommentModelSerializer, responses=CommentModelSerializer)
class CommentView(PublicPostAPIView):

    def get(self, request, *args, **kwargs):
        data = CommentModel.objects.all().order_by('-id')
        serializer = CommentModelSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = CommentModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CommentViewWithProject(PublicPostAPIView):

    def post(self, request, *args, **kwargs):
        serializer = CommentModelWithProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    

@extend_schema(request=CommentModelSerializer, responses=CommentModelSerializer)
class CommentViewUpdate(SuperUserWriteAPIView):
    permission_classes = [IsSuperUserForWrite]


    def patch(self, request, pk):
        comment_obj = get_object_or_404(CommentModel, pk=pk)
        serializer = CommentModelSerializer(comment_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
    
    def delete(self, request, pk):
        data = get_object_or_404(CommentModel, pk=pk)
        data.delete()
        return Response({"detail": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


@extend_schema(request=ProjectSuggestionModelSerializer, responses=ProjectSuggestionModelSerializer)
class ProjectSuggestionView(PublicPostAPIView):

    def get(self, request, *args, **kwargs):
        data = ProjectSuggestionModel.objects.all().order_by('-id')
        serializer = ProjectSuggestionModelSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    def post(self, request, *args, **kwargs):
        serializer = ProjectSuggestionModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@extend_schema(request=ProjectSuggestionModelSerializer, responses=ProjectSuggestionModelSerializer)
class ProjectSuggestionViewUpdate(SuperUserWriteAPIView):
    permission_classes = [IsSuperUserForWrite]


    def patch(self, request, pk):
        suggestion_obj = get_object_or_404(ProjectSuggestionModel, pk=pk)
        serializer = ProjectSuggestionModelSerializer(suggestion_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
    
    def delete(self, request, pk):
        data = get_object_or_404(ProjectSuggestionModel, pk=pk)
        data.delete()
        return Response({"detail": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
