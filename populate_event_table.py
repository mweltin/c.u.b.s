import psycopg2
import constants
import glob
import csv
import os


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
    conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()

    insert_event_query = """
        INSERT INTO event (
            game_id  ,
            visiting_team  ,
            inning ,
            batting_team ,
            outs ,
            balls ,
            strikes ,
            pitch_sequence ,
            vis_score ,
            home_score ,
            batter ,
            batter_hand ,
            res_batter ,
            res_batter_hand ,
            pitcher ,
            pitcher_hand ,
            res_pitcher ,
            res_pitcher_hand ,
            catcher ,
            first_base ,
            second_base ,
            third_base ,
            shortstop ,
            left_field ,
            center_field ,
            right_field ,
            first_runner ,
            second_runner ,
            third_runner ,
            event_text ,
            leadoff_flag ,
            pinchhit_flag ,
            defensive_position ,
            lineup_position ,
            event_type ,
            batter_event_flag ,
            ab_flag ,
            hit_value ,
            sh_flag ,
            sf_flag ,
            outs_on_play ,
            double_play_flag ,
            triple_play_flag ,
            rbi_on_play ,
            wild_pitch_flag ,
            passed_ball_flag ,
            fielded_by ,
            batted_ball_type ,
            bunt_flag ,
            foul_flag ,
            hit_location ,
            num_errors ,
            first_error_player ,
            first_error_type ,
            second_error_player ,
            second_error_type ,
            third_error_player ,
            third_error_type ,
            batter_dest ,
            runner_on_first_dest ,
            runner_on_second_dest ,
            runner_on_third_dest ,
            play_on_batter ,
            play_on_runner_on_first ,
            play_on_runner_on_second ,
            play_on_runner_on_third ,
            sb_for_runner_on_first_flag ,
            sb_for_runner_on_second_flag ,
            sb_for_runner_on_third_flag ,
            cs_for_runner_on_first_flag ,
            cs_for_runner_on_second_flag ,
            cs_for_runner_on_third_flag ,
            po_for_runner_on_first_flag ,
            po_for_runner_on_second_flag ,
            po_for_runner_on_third_flag ,
            responsible_pitcher_for_runner_on_first ,
            responsible_pitcher_for_runner_on_second ,
            responsible_pitcher_for_runner_on_third ,
            new_game_flag ,
            end_game_flag ,
            pinch_runner_on_first ,
            pinch_runner_on_second ,
            pinch_runner_on_third ,
            runner_removed_for_pinch_runner_on_first ,
            runner_removed_for_pinch_runner_on_second ,
            runner_removed_for_pinch_runner_on_third ,
            batter_removed_for_pinch_hitter ,
            position_of_batter_removed_for_pinch_hitter ,
            fielder_with_first_putout ,
            fielder_with_second_putout ,
            fielder_with_third_putout ,
            fielder_with_first_assist ,
            fielder_with_second_assist ,
            fielder_with_third_assist ,
            fielder_with_fourth_assist ,
            fielder_with_fifth_assist ,
            event_num
        )
        VALUES (
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s, 
            %s 
        );
    """
    for glob_item in glob.glob(constants.RETRO_DATA_DIR + '/*'):
        if os.path.isdir(glob_item):
            os.chdir(glob_item)
            for file in glob.glob('*.csv'):
                print("Processing file: " + file)
                with open(file, newline='') as csv_file:
                    event_row = csv.reader(csv_file)
                    for insert_data in event_row:
                        # over come limitation in csv.reader convert empty values (i.e. '') to None (i.e. NULL)
                        for i in range(len(insert_data)):
                            if insert_data[i] == '':
                                insert_data[i] = None
                        cursor.execute(insert_event_query, insert_data)
                print("Finished processing file: " + file)


if __name__ == "__main__":
    main()
