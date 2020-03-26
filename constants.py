import os
import glob

# Define these constants to match your environment
RETRO_TOOL_DIR = '/home/mweltin/Downloads/retrosheetTools'
RETRO_DATA_DIR = '/home/mweltin/retroEvents'

def main():

    if os.path.isdir(RETRO_DATA_DIR):
        if not os.access(RETRO_DATA_DIR, os.W_OK):
            raise Exception(RETRO_DATA_DIR + "is not writable.")
    else:
        raise Exception(RETRO_DATA_DIR + " does not exist.  Please create ")

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


if __name__ == "__main__":
    main()
