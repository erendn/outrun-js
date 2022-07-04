# Run this script to create the "dir" file
from os import path, walk
with open("dir", "w") as dir_file:
    for subdir, dirs, files in walk("."):
        for file in files:
            if file != "dir" and file != "dir.py":
                dir_file.write(path.join(subdir, file)[2:] + "\n")