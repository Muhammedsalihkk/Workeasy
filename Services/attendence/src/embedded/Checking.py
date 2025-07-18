import face_recognition
import sys
import numpy 
import json
import ast
import numpy as np

stored=sys.argv[1]
new_one=sys.argv[2] 
stored_list=json.loads(stored)
store_array=np.array(stored_list)
new_image=face_recognition.load_image_file(new_one)
encoded=face_recognition.face_encodings(new_image)
if len(encoded)==0:
    sys.stderr.write("face not found try again")

encoded=encoded[0]
result=face_recognition.compare_faces([store_array],encoded)

if result[0]:
    print("face is match")
else:
    sys.stderr.write("face not match")
    


