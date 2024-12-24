from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import joblib
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

# load precomputed recommendations
with open("precomputed_recommendations.json", "r") as open_file:
  precomputed_recommendations = json.load(open_file)

# load models to train recommendation for anime not in precomputed
anime_data = pd.read_csv("models/anime_data.csv")
all_features = pd.read_csv("models/all_features.csv")
tfidf = joblib.load("models/synopsis_vector.pkl")
mlb = joblib.load("models/genres_encoder.pkl")
scaler = joblib.load("models/feature_scaler.pkl")
nmf = joblib.load("models/nmf_model.pkl")
  
# precomputed recommendations
# @app.route("/api/recommend", methods=["GET"])
@app.route("/api/recommend", methods=["POST"])
def recommend():
  data = request.json
  anime_id = data["id"]
  # get anime id from query
  # anime_id = request.args.get("anime_id")
  
  if anime_id in precomputed_recommendations:
    recommendations = precomputed_recommendations[anime_id]
    return jsonify(recommendations)
  else:
    return dynamic_recommend(data)

# dynamically trained recommendations
def dynamic_recommend(data):
  synopsis = data.get("synopsis", "")
  genres = [genre["name"] for genre in data["genres"]]
  popularity = data["popularity"]
  
  favorites = data.get("favorites")
  favorites = favorites if favorites is not None else 0
  
  rank = data.get("rank")
  rank = rank if rank is not None else 0

  score = data.get("score")
  score = score if score is not None else 6
  
  numerical = np.array([popularity, rank, score, favorites]).reshape(1, -1)
  
  tfidf_matrix = tfidf.transform([synopsis])
  genres_encoded = mlb.transform([genres])
  numerical_scaled = scaler.transform(numerical)
  combined_features = np.hstack([tfidf_matrix.toarray(), numerical_scaled, genres_encoded])
  
  W = nmf.transform(combined_features)
  cos_sim = cosine_similarity(W, nmf.transform(all_features.values))
  recommend_ids = cos_sim.argsort()[0][-10:][::-1].tolist() # may included invalid anime ids
  
  valid_anime_ids = anime_data["id"].tolist()
  filtered_recommendations = [anime_id for anime_id in recommend_ids if anime_id in valid_anime_ids]

  return jsonify(filtered_recommendations)

  
if __name__ =="__main__":
  app.run()
