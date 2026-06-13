# AES-256 Encryption Web Application

A web-based AES-256 Encryption and Decryption platform built using **Flask, C++, HTML, CSS, JavaScript, and Bootstrap**. The project implements the AES (Advanced Encryption Standard) algorithm from scratch in C++ and provides an easy-to-use web interface for encrypting and decrypting both text and image files.

---

## About AES-256 Encryption

AES (Advanced Encryption Standard) based on the Rijndael algorithm designed by Joan Daemen and Vincent Rijmen is one of the most widely used symmetric-key encryption standards for securing sensitive data worldwide.

This project features a custom AES-256 implementation written entirely in C++ following the concepts presented in the original Rijndael research paper. Core AES operations such as SubBytes, ShiftRows, MixColumns, AddRoundKey, Key Expansion, Encryption and Decryption methods have been implemented manually and integrated with a Flask-powered web application.

---

## Key Features

* Custom AES-256 implementation from scratch in C++
* Text encryption and decryption
* Image encryption and decryption
* Multiple image processing support
* File upload and download functionality
* ZIP archive generation for processed images
* Responsive web interface
* Flask and C++ integration

---

## AES-256 Specifications

* Uses a 256-bit encryption key
* Requires a 32-character key
* Operates on fixed 128-bit data blocks
* Performs 14 rounds of transformation per block
* Provides strong resistance against known cryptographic attacks
* Uses the same key for encryption and decryption

---

## AES Encryption Workflow

### Encryption

1. Plaintext is divided into 128-bit blocks.
2. The 256-bit key is expanded into round keys.
3. Initial AddRoundKey operation is performed.
4. 13 rounds execute:
   * SubBytes
   * ShiftRows
   * MixColumns
   * AddRoundKey
5. Final round executes:
   * SubBytes
   * ShiftRows
   * AddRoundKey
6. Ciphertext is generated.

### Decryption

The encryption process is reversed using the inverse AES transformations to recover the original data.

---

## Text Encryption Module

### Features

* Manual text input
* File upload support
* AES-256 encryption and decryption
* Copy encrypted/decrypted output
* Download results as files

### How It Works

1. User enters a 32-character AES key.
2. Plaintext is entered manually or uploaded through a file.
3. Flask receives the request.
4. The C++ AES engine performs encryption or decryption.
5. Results are displayed on the webpage and can be downloaded.

### Error Handling

* If the decrypted output displays `undefined`, the encryption key or encrypted text is incorrect.
* If a decrypted file cannot be opened, the wrong key or corrupted encrypted content was likely used, resulting in an unreadable file.

---

## Image AES Encryption System

This module extends AES encryption to image files by processing raw binary image data instead of text.

### Core Features

* Single image encryption and decryption
* Multiple image encryption and decryption
* Image count display
* ZIP file generation for downloads
* Binary-safe encryption handling

### Input and Output Formats

| Operation     | Output Format                                |
| ------------- | -------------------------------------------- |
| Encrypt Image | `.enc`                                       |
| Decrypt Image | Original image format (`.png`, `.jpg`, etc.) |

All encrypted and decrypted image outputs are packaged into downloadable ZIP files.

### How Image Encryption Works

1. Image files are read as raw binary data.
2. Binary data is divided into 16-byte AES blocks.
3. AES-256 encryption is applied block by block.
4. Encrypted output is stored as `.enc` files.
5. During decryption, the process is reversed to reconstruct the original image.

### Technical Workflow

* Flask handles uploads and temporary file management.
* C++ performs AES encryption and decryption.
* Binary-safe processing prevents encoding corruption.
* Temporary files are automatically cleaned after processing.

---

## Security Note

AES-256 is currently regarded as computationally secure against practical brute-force attacks.
A 256-bit key provides: 2²⁵⁶ possible key combinations
This keyspace is so large that exhaustive key searches are considered infeasible using modern computing resources.

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap

### Backend

* Python
* Flask

### Encryption Engine

* C++

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd AES-256-Encryption-Web-App
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Compile C++ Programs

For Linux users: 
```bash
g++ aesLinux.cpp -o aesLinux
g++ image.cpp -o image
```

For Windows (MinGW):
```bash
g++ aesLinux.cpp -o aesLinux.exe
g++ image.cpp -o image.exe
```

### Run Application

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

---

## Future Enhancements

* User Authentication using JWT
* Database Integration
* Encryption History
* Cloud Storage Support
* Folder Encryption for Text multiple uploads
* Performance Optimization for Large Files

---

## References

* Original Rijndael Research Paper (`rijndael.pdf`)

---

## License

This project is licensed under the MIT License included in this repository.
