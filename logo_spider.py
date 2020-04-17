#!/usr/bin/python3

import constants
import scrapy
import re


class retroPlayerSpider(scrapy.Spider):
    """
    Grab players data from the retrosheet static page of players and save it to a CSV file
    """
    name = "logo_spider"
    start_urls = ['http://www.sportslogos.net/teams/list_by_year/42019/2019_MLB_Logos/']

    def parse(self, response):
        for x in response.css('.logoWall')[0].css('li'):
            yield {
                'temp': ','.join(x.css("a::text").extract()).replace('\t', '').replace('\n', '').replace(',', '').strip(),
                'url': x.css('a img::attr(src)').get(),
            }
