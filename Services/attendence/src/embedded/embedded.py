import face_recognition
import sys
import json

test=sys.argv[1]
known_image=face_recognition.load_image_file(test)
encoding=face_recognition.face_encodings(known_image)
if len(encoding)==0:
    sys.stderr.write("face not found")
else:
    encoding_list=encoding[0].tolist()
    print(json.dumps(encoding_list))



