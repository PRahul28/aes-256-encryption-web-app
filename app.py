from flask import Flask, render_template, request, send_file, after_this_request, jsonify
import subprocess
import tempfile
import os
import zipfile

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html', active_page='aes')

@app.route('/image-encryption')
def image_encryption():
    return render_template('image_encryption.html', active_page='image')


@app.route('/encrypt-image', methods=['POST'])
def encrypt_image():

    files = request.files.getlist('imageFile')
    key = request.form['key']

    if not files: return "No images provided"

    temp_inputs = []
    temp_outputs = []
    zip_path = tempfile.mktemp(suffix=".zip")

    for file in files:
        if not file.filename: continue

        input_temp = tempfile.NamedTemporaryFile(delete=False)
        input_path = input_temp.name
        file.save(input_path)
        input_temp.close()

        output_temp = tempfile.NamedTemporaryFile(delete=False, suffix=".enc")
        output_path = output_temp.name
        output_temp.close()

        subprocess.run([
            './image',
            'encrypt',
            input_path,
            output_path,
            key
        ])

        temp_inputs.append(input_path)
        temp_outputs.append(output_path)

    with zipfile.ZipFile(zip_path, 'w') as zipf:
        for i, out_file in enumerate(temp_outputs):
            zipf.write(out_file, f"encrypted_{i}.enc")

    @after_this_request
    def cleanup(response):
        try:
            for f in temp_inputs + temp_outputs:
                os.remove(f)
            os.remove(zip_path)
        except Exception as e:
            print("Cleanup error:", e)
        return response

    return send_file(
        zip_path,
        as_attachment=True,
        download_name="encrypted_images.zip"
    )



@app.route('/decrypt-image', methods=['POST'])
def decrypt_image():

    files = request.files.getlist('imageFile')
    key = request.form['key']

    if not files: return "No encrypted files provided"

    temp_inputs = []
    temp_outputs = []

    zip_path = tempfile.mktemp(suffix=".zip")

    for file in files:
        if not file.filename: continue

        input_temp = tempfile.NamedTemporaryFile(delete=False, suffix=".enc")
        input_path = input_temp.name
        file.save(input_path)
        input_temp.close()

        output_temp = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
        output_path = output_temp.name
        output_temp.close()

        subprocess.run([
            './image',
            'decrypt',
            input_path,
            output_path,
            key
        ])

        temp_inputs.append(input_path)
        temp_outputs.append(output_path)

    with zipfile.ZipFile(zip_path, 'w') as zipf:
        for i, out_file in enumerate(temp_outputs):
            zipf.write(out_file, f"decrypted_{i}.png")

    @after_this_request
    def cleanup(response):
        try:
            for f in temp_inputs + temp_outputs:
                os.remove(f)
            os.remove(zip_path)
        except Exception as e:
            print("Cleanup error:", e)
        return response

    return send_file(
        zip_path,
        as_attachment=True,
        download_name="decrypted_images.zip"
    )


@app.route('/encrypt', methods=['POST'])
def encrypt():

    uploaded_file = request.files.get('encryptFile')
    manual_text = request.form.get('encryptText','').strip()
    key = request.form['enc_key']

    if manual_text: plaintext = manual_text
    elif uploaded_file and uploaded_file.filename:
        plaintext = uploaded_file.read().decode('utf-8', errors='ignore')
    else:
        return jsonify({
            "error": "No text or file provided"
        }), 400

    result = subprocess.run(
        [
            './aesLinux',
            'encrypt',
            plaintext,
            key
        ],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        return jsonify({
            "error": result.stderr.strip()
        }), 400

    ciphertext = result.stdout.strip()

    if manual_text:
        return jsonify({
            "ciphertext": ciphertext
        })

    else:
        original_name = os.path.splitext(uploaded_file.filename)[0]
        encrypted_filename = (original_name + ".enc")

        with open(
            encrypted_filename,
            "w",
            encoding="utf-8"
        ) as f:
            f.write(ciphertext)

        return send_file(
            encrypted_filename,
            as_attachment=True,
            download_name=encrypted_filename
        )

@app.route('/decrypt', methods=['POST'])
def decrypt():

    uploaded_file = request.files.get('decryptFile')
    manual_text = request.form.get('decryptText','').strip()
    key = request.form['dec_key']

    if manual_text: ciphertext = manual_text
    elif uploaded_file and uploaded_file.filename:
        ciphertext = uploaded_file.read().decode('utf-8', errors='ignore')
    else:
        return jsonify({
            "error": "No encrypted input provided"
        }), 400

    result = subprocess.run(
        [
            './aesLinux',
            'decrypt',
            ciphertext,
            key
        ],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        return jsonify({
            "error": result.stderr.strip()
        }), 400

    plaintext = result.stdout.strip()

    if manual_text:
        return jsonify({
            "plaintext": plaintext
        })

    else:
        original_name = os.path.splitext(uploaded_file.filename)[0]
        decrypted_filename = (original_name + "_decrypted.txt")

        with open(
            decrypted_filename,
            "w",
            encoding="utf-8"
        ) as f:
            f.write(plaintext)

        return send_file(
            decrypted_filename,
            as_attachment=True,
            download_name=decrypted_filename
        )

if __name__ == '__main__':
    app.run(debug=True)
