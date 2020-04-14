import unittest
import fetch_retrosheet_events
import datetime
import constants


class TestValidateArgs(unittest.TestCase):

    def test_default_args(self):
        empty_object = type('request', (), {})()

        args = fetch_retrosheet_events.validateArgs(empty_object)
        this_year = datetime.datetime.now().year

        self.assertEqual(args.start_year, 1918, "start year does not default to 1918")
        self.assertEqual(args.end_year, this_year, "end year does not this year")
        self.assertEqual(args.destination_dir, constants.RETRO_DATA_DIR, "default destination is not current directory")

    def test_start_year_less_than_1918_raises_exception(self):
        test_object = type('request', (), {})()
        test_object.s = 1914
        test_object.d = '.'
        test_object.e = 1940

        self.assertRaises(Exception, fetch_retrosheet_events.validateArgs, test_object)

    def test_end_year_greater_than_this_year_raises_exception(self):
        test_object = type('request', (), {})()
        test_object.s = 1918
        test_object.d = '.'
        test_object.e = 2050

        self.assertRaises(Exception, fetch_retrosheet_events.validateArgs, test_object)

    def test_end_year_cannot_be_greater_than_start_year(self):
        test_object = type('request', (), {})()
        test_object.s = 1975
        test_object.d = '.'
        test_object.e = 1950

        self.assertRaises(Exception, fetch_retrosheet_events.validateArgs, test_object)

    def test_destination_dir_is_reachable(self):
        test_object = type('request', (), {})()
        test_object.s = 1975
        test_object.d = './dirThatDoesNotExist'
        test_object.e = 1985

        with self.assertRaises(Exception) as cm:
            fetch_retrosheet_events.validateArgs(test_object)

        self.assertEqual(cm.exception.args[0], 'You can not write to ./dirThatDoesNotExist')


if __name__ == '__main__':
    unittest.main()
