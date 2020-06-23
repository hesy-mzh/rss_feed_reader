#!/usr/bin/env python3

from flask import Flask, render_template, jsonify
from feedparser import parse
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('rssreader.html')


@app.route('/data/feed')
def feed2json():

    RSS_URLs = [
        "https://news.google.co.jp/news/rss",
        "http://srad.jp/sradjp.rss",
        "https://news.yahoo.co.jp/pickup/rss.xml",
    ]

    def convert_date(d):
        return datetime(
            d.tm_year, d.tm_mon, d.tm_mday, d.tm_hour, d.tm_min, d.tm_sec
        )

    data=[
        {
            "rss"     : parse(url).feed["title"],
            "title"   : ent["title"],
            "link"    : ent["link"],
            "date"    : convert_date(ent["updated_parsed"]),
            "summary" : ent.get("summary", "No DATA"),
        }
        for url in RSS_URLs
        for ent in parse(url).entries
    ]
    
    data.sort(key=lambda x: x["date"], reverse=True)
    
    return jsonify(data)


if __name__ == "__main__":
    app.run(host="0.0.0.0")
