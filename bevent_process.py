#!/usr/bin/python3
import glob
from zipfile import ZipFile
import os
import subprocess
import constants


def main() -> None:
    """
    Take event files downloaded by fetch_retrosheet_events.py and convert them to CSV files.
    :return: None
    """
    try:
        constants.main()
    except Exception as exp:
        print("You have an error in you constants file.  You must correct that before you can continue")
        print(exp.args[0])
        exit(1)

    for file in glob.glob(constants.RETRO_DATA_DIR + '/' + "*.zip"):
        base_name = os.path.basename(file)
        year = base_name[:4]

        storage_dir = constants.RETRO_DATA_DIR + '/' + year + 'Events'

        if os.path.isdir(storage_dir):
            if not os.access(storage_dir, os.W_OK):
                raise Exception(storage_dir + " exists but is not writable")
        else:
            os.mkdir(storage_dir, 0o755)

        with ZipFile(file, 'r') as zipObj:
            zipObj.extractall(storage_dir)

        os.chdir(storage_dir)
        for event_file in glob.glob(storage_dir + '/' + "*.EV*"):
            output_file = os.path.splitext(event_file)[0]
            myoutput = open(output_file + '.csv', 'w')
            subprocess.Popen(["wine", constants.RETRO_TOOL_DIR + "/BEVENT.EXE", "-y", year, "-f", "0-96", event_file],
                             stdout=myoutput, stderr=subprocess.PIPE,
                             universal_newlines=True)


if __name__ == "__main__":
    main()
