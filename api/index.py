from flask import Flask, request, jsonify
import json

app = Flask(__name__)

with open("precomputed_recommendations.json", "r") as open_file:
  precomputed_recommendations = json.load(open_file)

# @app.route("/api/recommend", method=["GET"])
# def recommend(anime_id):
#   if anime_id in precomputed_recommendations:
#     recommendations = precomputed_recommendations[anime_id]
#     return jsonify(recommendations)
#   else:
#     return jsonify([])

def recommend(anime_id):
  if anime_id in precomputed_recommendations:
    recommendations = precomputed_recommendations[anime_id]
    return recommendations
  else:
    return []
print(recommend("54857"))