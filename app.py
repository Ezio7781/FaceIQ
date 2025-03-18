from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize Flask
app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# Define the POST route
@app.route('/analyze_skin', methods=['POST'])
def analyze_skin():
    try:
        # Get the data sent from the frontend
        data = request.json
        image = data.get('image')  # Base64 image string

        if not image:
            return jsonify({"error": "No image received"}), 400

        # Simulate skin analysis (replace this with real AI logic later)
        return jsonify({
            "message": "Skin analysis successful!",
            "skin_type": "Oily",
            "recommended_products": [
                {"name": "Oil-Free Face Wash", "link": "https://example.com/oil-free-face-wash"},
                {"name": "Hydrating Toner", "link": "https://example.com/hydrating-toner"}
            ]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the server
if __name__ == '__main__':
    app.run(debug=True)