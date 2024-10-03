from flask import Flask,render_template,request,url_for
import requests



app = Flask(__name__)


key = 'AIzaSyDszwHyMkqcPjJtH6Qn2cpoPcGzzqYgu3E'



@app.route('/')
def index():
    datas = video_url()
    data = []
    index = "0123456789"

    for i in range(0,6):
      img = datas[i]["snippet"]["thumbnails"]['default']['url']
      video_title = datas[i]['snippet']['title']
      channel_title = datas[i]['snippet']['channelTitle']
      data.append([img,video_title,channel_title])
      print(data)

    video_id = 'mqhxxeeTbu0'
    video_link = f'https://youtube.com/watch?v={video_id}'
    return render_template('home.html', video_link = video_link,data=data)



def video_url():
   # youtube_api_url = f'https://www.googleapis.com/youtube/v3/videos?id={video_id}&key={key}&part=snippet,contentDetails,statistics'
    youtube_api_url = f'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResult=9&q=flask+tuto&key={key}'
    response = requests.get(youtube_api_url)
    if response.status_code == 200:
        data = response.json()
        return data['items']
    else:
       print('error')



if __name__ == '__main__':
    app.run(debug=True)