
import os

def create_folders_and_files(directory_file):
    with open(directory_file, 'r') as file:
        lines = file.readlines()

    current_chapter = None

    for line in lines:
        if line.strip():
            line = str(line).replace("*", "")
            line = str(line).replace("/", "-")
            if line.startswith('第'):
                current_chapter = line.strip()
                folder_name = current_chapter
                # folder_name = current_chapter.split('：')[1]
                os.makedirs(folder_name, exist_ok=True)
            else:
                if current_chapter:
                    topic_name = line.strip()
                    file_name = topic_name + '.md'
                    file_path = os.path.join(folder_name, file_name)

                    with open(file_path, 'w') as topic_file:
                        topic_file.write(f'# {topic_name}\n\n')

if __name__ == "__main__":
    directory_file = "目录.md"
    create_folders_and_files(directory_file)