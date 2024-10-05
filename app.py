from flask import Flask,render_template,request,url_for
import requests



app = Flask(__name__)


key = 'AIzaSyDszwHyMkqcPjJtH6Qn2cpoPcGzzqYgu3E'


@app.route('/')
def index():
      datas = video_url()[0]['snippet']
      img = datas["thumbnails"]['default']['url']
      video_title = datas['title']
      channel_title = datas['channelTitle']
      channel_id = datas['channelId']
      video_id = '_kZvTSwBkwE'
      channel_req = f'https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&channelId={channel_id}&key={key}'
      res = requests.get(channel_req)
      channel = res.json()
      video_link = f'https://youtube.com/watch?v={video_id}'
      
      return render_template('home.html', video_link = video_link,img = img, video_title = video_title, channel_title = channel_title,  datas = datas,channel = channel)



def video_url():
    youtube_api_url = f'https://www.googleapis.com/youtube/v3/videos?id=_kZvTSwBkwE&key={key}&part=snippet,contentDetails,statistics'
    #youtube_api_url = f'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResult=9&q=flask+tuto&key={key}'
    response = requests.get(youtube_api_url)
    if response.status_code == 200:
        data = response.json()
        return data['items']
    else:
       print('error')



if __name__ == '__main__':
    app.run(debug=True)