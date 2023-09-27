from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/save", methods=["POST"])
def save():
    try:
        return jsonify({"success": True, "message": "Dibujo guardado correctamente."})

    except Exception as e:
        return jsonify({"success": False, "message": "Error al guardar el dibujo.", "error": str(e)})



if __name__ == "__main__":
    app.run()