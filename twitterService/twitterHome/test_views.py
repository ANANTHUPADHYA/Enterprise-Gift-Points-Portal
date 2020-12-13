from django.contrib.sites import requests

from .views import getTweets, setTweets, deleteTweet
from django.test import TestCase
import unittest
import mock

class TestingViews(unittest.TestCase):

    @mock.patch('.views.requests')
    def test_getTweets(self, mock_requests):

        # Mocking the requests' GET method to send an appropriate response
        mock_requests.get.return_value.text = '[]'
        tweet = getTweets()

        # Asserting that Twitter URL was correctly constructed
        expectedUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json"
        self.assertApiCallsWithMockedInstance(self.client.get, "GET", expectedUrl)

    @mock.patch('requests.post')
    def test_postTweet(self, mock_requests):

        # Mocking the requests' POST method to send an appropriate response
        tweetJson = {"status" : "Yayyy"}

        mock_requests.post.return_value.text = '{"contributors":null,"coordinates":null,"created_at":"Sat Oct 19 17:43:56 +0000 2019","entities":{"hashtags":[],"symbols":[],"urls":[],"user_mentions":[]},"favorite_count":0,"favorited":false,"geo":null,"id":1185612559220478000,"id_str":"1185612559220477952","in_reply_to_screen_name":null,"in_reply_to_status_id":null,"in_reply_to_status_id_str":null,"in_reply_to_user_id":null,"in_reply_to_user_id_str":null,"is_quote_status":false,"lang":"en","place":null,"retweet_count":0,"retweeted":false,"source":"","text":"hello","truncated":false,"user":{"contributors_enabled":false,"created_at":"Sun Oct 06 03:29:23 +0000 2019","default_profile":true,"default_profile_image":true,"description":"","entities":{"description":{"urls":[]}},"favourites_count":0,"follow_request_sent":false,"followers_count":0,"following":false,"friends_count":0,"geo_enabled":false,"has_extended_profile":true,"id":1180686389827924000,"id_str":"1180686389827923969","is_translation_enabled":false,"is_translator":false,"lang":null,"listed_count":0,"location":"","name":"Nupur","notifications":false,"profile_background_color":"F5F8FA","profile_background_image_url":null,"profile_background_image_url_https":null,"profile_background_tile":false,"profile_image_url":"http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png","profile_image_url_https":"https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png","profile_link_color":"1DA1F2","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"protected":false,"screen_name":"Nupur11159291","statuses_count":2,"time_zone":null,"translator_type":"none","url":null,"utc_offset":null,"verified":false}}'
        tweet = setTweets(mock_requests)

        # Asserting that Twitter URL was correctly constructed
        expectedUrl = "https://api.twitter.com/1.1/statuses/update.json?status=Yayyy"
        self.assertApiCallsWithMockedInstance(self.client.post, "POST", expectedUrl)

    @mock.patch('requests.post')
    def testDeleteTweet(self, mock_requests):

        # Mocking the requsts' POST method to send an appropriate response
        tweetId = "1183486349204230145"
        mock_requests.post.return_value.text = '{"created_at":"Sun Oct 13 20:55:08 +0000 2019","id":1183486349204230145,"id_str":"1183486349204230145","text":"hello","truncated":false,"entities":{"hashtags":[],"symbols":[],"user_mentions":[],"urls":[]},"source":"","in_reply_to_status_id":null,"in_reply_to_status_id_str":null,"in_reply_to_user_id":null,"in_reply_to_user_id_str":null,"in_reply_to_screen_name":null,"user":{"id":1180686389827923969,"id_str":"1180686389827923969"},"geo":null,"coordinates":null,"place":null,"contributors":null,"is_quote_status":false,"retweet_count":0,"favorite_count":0,"favorited":false,"retweeted":false,"lang":"en"}'
        tweet = deleteTweet(requests, tweetId)

        expectedUrl = "https://api.twitter.com/1.1/statuses/destroy?id=1183486349204230145.json"
        self.assertApiCallsWithMockedInstance(self.client.post, "POST", expectedUrl)


