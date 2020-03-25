#!/usr/bin/python3
import os
from datetime import date
import argparse
import requests


def setup_args():
    parser = argparse.ArgumentParser(description="Download retrosheet.org event files by year.")
    parser.add_argument("-e", type=int, help="End year, four digit year default 1918", metavar='')
    parser.add_argument("-d", type=str, help="Directory where files should be saved", metavar='')
    parser.add_argument("-s", type=int, help="Start year, four digit year default this year", metavar='')
    return parser


class validateArgs:

    def __init__(self, args):
        self.base_url = 'http://www.retrosheet.org/'
        if hasattr(args, 's'):
            self.start_year = args.s
        else:
            self.start_year = 1918
        if hasattr(args, 'e'):
            self.end_year = args.e
        else:
            self.end_year = int(date.today().strftime('%Y'))
        if hasattr(args, 'd'):
            self.destination_dir = args.d
        else:
            self.destination_dir = '.'
        self.validate()

    def validate(self):
        if not isinstance(self.start_year, int):
            raise Exception("Start year must be an integer")

        if not isinstance(self.end_year, int):
            raise Exception("End year must be an integer")

        if self.start_year < 1918:
            raise Exception("Start year must be equal to or greater than 1918")

        if self.start_year > self.end_year:
            raise Exception("Start year must be less than or equal to end year")

        if self.end_year > int(date.today().strftime('%Y')):
            raise Exception("End year can not exceed current year")

        if not os.access(self.destination_dir, os.W_OK):
            raise Exception("You can not write to " + self.destination_dir)


def main():
    parser = setup_args()
    args = parser.parse_args()
    try:
        params = validateArgs(args)
    except Exception as error:
        print(error)
        exit(1)

    for year in range(params.start_year, params.end_year+1, 1):
        year = str(year)
        file_name = params.destination_dir + '/' + year + 'event.zip'
        url = params.base_url + 'events/' + year + 'eve.zip'
        print("Fetching " + file_name)
        req = requests.get(url)
        file = open(file_name, 'wb')
        for chunk in req.iter_content(100000):
            file.write(chunk)
        file.close()


if __name__ == "__main__":
    main()
