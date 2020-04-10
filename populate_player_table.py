import psycopg2
import constants
import csv


def main() -> None:
    """
    Take CSV files crated by bevent_process and insert that data into the bbhip database
    :return: None
    """
    try:
        constants.main()
    except Exception as exp:
        print("You have an error in you constants file.  You must correct that before you can continue")
        print(exp.args[0])
        exit(1)

    connect_str = "user='bbhip' host='localhost' dbname='bbhip'"
    conn = psycopg2.connect(connect_str)
    conn.autocommit = True
    cursor = conn.cursor()

    insert_player_query = """
        INSERT INTO player (
            id,
            last,
            first,
            play_debut,
            mgr_debut,
            coach_debut,
            ump_debut
        )
        VALUES (
            %s,
            %s,
            %s,
            %s,
            %s,
            %s,
            %s
        );
    """
    file = constants.RETRO_DATA_DIR+'/players.csv'
    with open(file, newline='') as csv_file:
        player = csv.reader(csv_file)
        for insert_data in player:
            # over come limitation in csv.reader convert empty values (i.e. '') to None (i.e. NULL)
            for i in range(len(insert_data)):
                if insert_data[i] == '':
                    insert_data[i] = None
            print(insert_data[0:-1])
            try:
                cursor.execute(insert_player_query, insert_data[0:-1])
            except Exception as exp:
                print("problem inserting data")
                print(exp.args[0])
    print("Finished processing file: " + file)


if __name__ == "__main__":
    main()
