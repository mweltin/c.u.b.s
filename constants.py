import os
import glob
import psycopg2

# Begin user defined constants
# Define these constants to match your environment
RETRO_TOOL_DIR = '/home/mweltin/Downloads/retrosheetTools'
RETRO_DATA_DIR = '/home/mweltin/retroEvents'

DB_HOST = 'localhost'
DB_USER = 'bbhip'
DB = 'bbhip'
# see README for password configuration instructions
# End of user defined constants section

def main() -> None:
    """
    When used as a module (i.e. import constants) it defines constants 
    used throughout the other scripts.

    This file can also be run at the command line to test your configurable 
    options.  It will ensure the directory you specify to hold data exists 
    and is writable.  It will ensure you have installed the retrosheet tools.
    It will also test that your database configuration is setup correctly.
    """

    # Make sure data directory exists and is writable
    if os.path.isdir(RETRO_DATA_DIR):
        if not os.access(RETRO_DATA_DIR, os.W_OK):
            raise Exception(RETRO_DATA_DIR + "is not writable.")
    else:
        raise Exception(RETRO_DATA_DIR + " does not exist.  Please create ")

    # Make sure retrosheet tool dir exists and contains the retrosheet tools
    if not os.path.isdir(RETRO_TOOL_DIR):
        raise Exception("Retro tools directory does not exist")

    retro_tools = glob.glob(RETRO_TOOL_DIR + '/' + "*.EXE")

    retro_tools = list(map(lambda x: os.path.basename(x), retro_tools))

    if 'BEVENT.EXE' not in retro_tools:
        raise Exception('BEVENT.EXE was not found.')

    if 'BGAME.EXE' not in retro_tools:
        raise Exception('BGAME.EXE was not found.')

    if 'BOX.EXE' not in retro_tools:
        raise Exception('BOX.EXE was not found.')

    # Ensure database configuration is correct
    try:
        connect_str = "user='bbhip' host='localhost' dbname='template1'"
        conn = psycopg2.connect(connect_str)
        cursor = conn.cursor()
    except Exception as e:
        print("Problem connecting to database")
        print(e)

    try:
        cursor.execute("CREATE DATABASE bbhip_test;")
        cursor.execute("DROP DATABASE bbhip_test;")
    except Exception as e:
        print("Problemis creating or destroying databases")
        print(e)


if __name__ == "__main__":
    main()
