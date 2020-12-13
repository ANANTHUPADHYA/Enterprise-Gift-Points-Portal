from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('getTweets/', views.getTweets, name='getTweets'),
    path('setTweets/', views.setTweets, name='setTweets'),
    path('deleteTweets/<id>', views.deleteTweet, name='deleteTweets'),
]