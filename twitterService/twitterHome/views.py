import json
from django.shortcuts import render
import requests
from requests_oauthlib import OAuth1, OAuth1Session
# Create your views here.
from django.http import HttpResponse
from twitterService import settings
from django.views.decorators.csrf import csrf_exempt
from django import forms

#Author: Ananth Upadhaya
def createAuthObj():
 authObj = OAuth1Session(settings.TWITTER_CONFIG['CONSUMER_KEY'],
                   client_secret =settings.TWITTER_CONFIG['CONSUMER_SECRET'],
                   resource_owner_key = settings.TWITTER_CONFIG['ACCESS_KEY'],
                   resource_owner_secret = settings.TWITTER_CONFIG['ACCESS_SECRET'])
 return authObj

#Author: Deesha Desai
def index(request):
    return render(request, 'home.html')

def getTweets(request):
    twitter = createAuthObj()
    url = settings.TWITTER_CONFIG['END_POINT'] + '/statuses/user_timeline.json'
    response = twitter.get(url)
    return HttpResponse(response)

#Author: Preeti Parihar

@csrf_exempt
def setTweets(request):
    #body_unicode = request.body.decode('utf-8')
    
    #body = json.loads(body_unicode)
    #content = body['tweet']
    #name = request.form['tweet']
    twitter = createAuthObj()
    form = forms.Form(request.POST)
    content = form.data['tweet']
    print(content)
    url = settings.TWITTER_CONFIG['END_POINT'] + '/statuses/update.json?status=' +  content
    response = twitter.post(url)
    return HttpResponse(response)

#Author: Priyanka Devendra
@csrf_exempt
def deleteTweet(request, id):
    twitter = createAuthObj()
    url = settings.TWITTER_CONFIG['END_POINT'] + '/statuses/destroy/' + id + '.json'
    response = twitter.post(url)
    return HttpResponse(response)




