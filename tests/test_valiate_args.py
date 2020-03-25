import fetch_retrosheet_events
import unittest
import datetime

class TestValidateArgs(unittest.TestCase):

    def test_default_args(self):
        empty_object = type('request', (), {})()

        args = fetch_retrosheet_events.validateArgs(empty_object)
        this_year = datetime.datetime.now().year

        self.assertEqual(args.start_year, 1918, "start year does not default to 1918")
        self.assertEqual(args.end_year, this_year, "end year does not this year")
        self.assertEqual(args.destination_dir, '.', "default destination is not current directory")


if __name__ == '__main__':
    unittest.main()
