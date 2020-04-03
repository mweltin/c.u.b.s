#!/usr/bin/python3

import constants
import scrapy
import re


class retroPlayerSpider(scrapy.Spider):
    """
    Grab players data from the retrosheet static page of players and save it to a CSV file
    """
    name = "retro_player_spider"
    start_urls = ['https://www.retrosheet.org/retroID.htm']

    def parse(self, response):
        player_selector = '//pre/text()'
        x = response.xpath(player_selector).extract_first()
        lines = x.splitlines()

        f = open(constants.RETRO_DATA_DIR + '/players.csv', 'w')
        p = re.compile('^[a-z]')
        for l in lines:
            if p.match(l):
                f.write(l+'\n')
        f.close()

